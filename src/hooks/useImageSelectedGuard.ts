import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "./useStore";
import { RootState } from "../store/store";

export default function useImageSelectedGuard(){
    const router = useNavigate();
    const {imageBlobURL} = useAppSelector((state: RootState) => state.image);  
    useEffect(() => {
      if (!imageBlobURL) router("/");
    }, []);
}