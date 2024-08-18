import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

export const useIngredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // первый вариант написания
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (erorr) {
        console.log(erorr);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();

    // второй вариант написания
    // Api.ingredients
    //   .getAll()
    //   .then((data) => {
    //     setItems(data);
    //   })
    //   .catch((erorr) => console.log(erorr));
  }, []);

  return {
    ingredients,
    loading,
  };
};
