"use server";

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { VerificationUserTemplate } from "@/shared/components/shared/email-templates/verification-user";
import { CheckoutFormValues } from "@/shared/constants";
import { sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-server-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookiesStore = cookies();
    const cartToken = cookiesStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,

        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    // Очищаем корзину
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    await sendEmail(
      data.email,
      "Next Pizza / Оплатите заказ #" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: "https://instagram.com",
      })
    );
    return;
  } catch (error) {
    console.log("createOrder", error);
  }
}

export async function updateUserInfo(body: Prisma.UserCreateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.log("Error [UPDATE_USER]", error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Почта не подтверждена");
      }

      throw new Error("Пользователь уже существует");
    }

    const createdUser = await prisma.user.create({
      data: {
        ...body,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
        // expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    console.log(createdUser);

    const html = `
    <p>Код подтверждения: <h2>${code}</h2></p>
    <p><a href="http://localhost:3000/api/auth/verify?code=${code}">Подтвердить регистрацию</a></p>
    `;

    await sendEmail(
      createdUser.email,
      "Next Pizza / Подтверждение регистрации",
      html
    );
  } catch (error) {
    console.log("Error [CREATE_USER]", error);
    throw error;
  }
}
