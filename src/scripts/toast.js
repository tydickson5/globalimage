import { 
    toastController,
} from '@ionic/vue';

export async function makeToast(m){
    const toast = await toastController.create({
        message: m,
        duration: 5000,
        position: "top",
        swipeGesture: "vertical",
        color: "danger",
    });

    await toast.present();
}