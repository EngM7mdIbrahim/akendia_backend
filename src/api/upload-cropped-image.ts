import { apiClient } from "../constants/settings";

export default async function uploadCroppedImage(imageData: string, fileName: string){
    const formData = new FormData();
    const imageBlob = await fetch(imageData).then((r) => r.blob());
    const imageFile = new File([imageBlob], fileName.split('.')[0]+".png", { type: 'image/png' });
    formData.append('image', imageFile );
    const {data} = await apiClient.post('/images/add-frame', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
}