import React from "react";
import {UseQueryOptions} from "react-query/types/react/types";
import Country from "~/src/Utils/Entities/Country";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;


type AppQueryOptions = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>


type ICallbackList = (list:Country[])=> Array<Country>;
