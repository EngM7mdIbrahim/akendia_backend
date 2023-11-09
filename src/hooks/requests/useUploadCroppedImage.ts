import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import uploadCroppedImage from "../../api/upload-cropped-image";
import { REACT_QUERY_KEYS } from "../../constants/react-query-keys";
import { IUploadCroppedImageResp } from "../../types/responses/ImageAddFrameResponseData";

export default function useUploadCroppedImage(
  options?: UseMutationOptions<IUploadCroppedImageResp, unknown, any, unknown>
) {
  return useMutation(
    [REACT_QUERY_KEYS.UPLOAD_IMG],
    ({ imageData, fileName }) => uploadCroppedImage(imageData, fileName),
    {
      ...options,
    }
  );
}
