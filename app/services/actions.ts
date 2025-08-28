import { useCallback, useEffect, useState } from "react";
import type { ICardDoc, ICreateCard } from "./interface";
import wishCardService from "./wishCard.service";

interface WishCardServiceState<T> {
  data?: T;
  isLoading: boolean;
  error: Error | null;
}

type CreateWishCardFunction = (
  payload: ICreateCard
) => Promise<string | undefined>;

export const useCreateWishCardAction = (): [
  CreateWishCardFunction,
  WishCardServiceState<ICardDoc>,
] => {
  const [state, setState] = useState<WishCardServiceState<ICardDoc>>({
    isLoading: false,
    error: null,
  });

  const createWishCard = useCallback(async (payload: ICreateCard) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      isSuccess: false,
    }));
    try {
      const result = await wishCardService.createCard(payload);
      setState({ isLoading: false, error: null });
      return result;
    } catch (error) {
      setState({ isLoading: false, error: error as Error });
    }
  }, []);

  return [createWishCard, state];
};

export const useGetWishCardQuery = ({ id }: { id: string }) => {
  const [state, setState] = useState<WishCardServiceState<ICardDoc>>({
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    setState({ isLoading: true, error: null });
    wishCardService
      .getCard(id)
      .then((res) => {
        setState({ isLoading: false, error: null, data: res });
      })
      .catch((error) => {
        setState({ isLoading: false, error: error as Error });
      });
  }, [id]);

  return state;
};

export const useGetAllWishCardsQuery = () => {
  const [state, setState] = useState<WishCardServiceState<ICardDoc[]>>({
    isLoading: false,
    error: null,
  });

  useEffect(() => {}, []);
};
