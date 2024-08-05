import { Container, Filters, Title } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { TopBar } from "@/components/shared/top-bar";

export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title={"Пиццы"}
                items={[
                  {
                    id: 1,
                    title: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:1875x1875/11EE8689A0D8A65D81FA681B15A5157A.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    title: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:1875x1875/11EE8689A0D8A65D81FA681B15A5157A.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    title: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:1875x1875/11EE8689A0D8A65D81FA681B15A5157A.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title={"Комбо"}
                items={[
                  {
                    id: 1,
                    title: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:1875x1875/11EE8689A0D8A65D81FA681B15A5157A.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    title: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:1875x1875/11EE8689A0D8A65D81FA681B15A5157A.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    title: "Чизбургер-пицца",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:1875x1875/11EE8689A0D8A65D81FA681B15A5157A.avif",
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
