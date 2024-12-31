import {
  getProductById,
  getProducts,
  getProductCategories,
  getSearchSuggestions,
  getUserProfile,
} from "../Apis/ProductsServices";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useGetSearchSuggestions = (query) => {
  const { data, error, isLoading, refetch, isError } = useQuery({
    queryKey: ["searchSuggestions", query],
    queryFn: () => getSearchSuggestions(query),
    select: (data) => {
      const titles = data.products.map((item) => item.title);
      return titles;
    },
  });
  return { data, error, isLoading, refetch, isError };
};

export const useGetProduct = (category, query) => {
  const { data, error, isLoading, refetch, isError } = useQuery({
    queryKey: ["products", category, query],
    queryFn: () => getProducts(category, query),
    select: (data) => {
      return data.products;
    },
  });
  return { data, error, isLoading, refetch, isError };
};

// export const useGetProduct2 = (category, query) => {
//   const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     isPending,
//     refetch,
//   } = useInfiniteQuery({
//     queryKey: ["products", category, query],
//     queryFn: ({ pageParam = 1 }) => getProducts(category, query, pageParam),
//     getNextPageParam: (lastPage, pages) => {
//       console.log("lastPage", lastPage.last_page, lastPage.current_page);
//       return lastPage.last_page > lastPage.current_page
//         ? lastPage.current_page + 1
//         : 1;
//     },
//     select: (data) => {
//       // const allTiles = data.pages.flatMap((page) => page.data);
//       // return allTiles;
//     },
//     retry: 1,
//   });
// };

export const useGetProductCategories = () => {
  const { data, error, isLoading, refetch, isError } = useQuery({
    queryKey: ["productCategories"],
    queryFn: () => getProductCategories(),
  });
  return { data, error, isLoading, refetch, isError };
};

export const useGetProductById = (productId) => {
  console.log("productId", productId);
  const { data, error, isLoading, refetch, isError } = useQuery({
    queryKey: ["productById", productId],
    queryFn: () => getProductById(productId),
    select: (data) => {
      // console.log("productById", data);
      return data;
    },
  });
  return { data, error, isLoading, refetch, isError };
};

export const useGetUserProfile = () => {
  // const id = Math.floor(Math.random() * 200) + 1;
  const id = 2;
  const { data, error, isLoading, refetch, isError } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserProfile(id),
  });
  return { data, error, isLoading, refetch, isError };
};
