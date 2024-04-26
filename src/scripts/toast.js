import { 
    toastController,

} from '@ionic/vue';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export async function makeToast(m, color){
    const toast = await toastController.create({
        message: m,
        duration: 5000,
        position: "top",
        swipeGesture: "vertical",
        color: color,
    });

    await toast.present();
}

export async function makeHaptic(type){
    if(type == 'light'){
        await Haptics.impact({ style: ImpactStyle.Light });
    }
    else{
        await Haptics.impact({ style: ImpactStyle.Medium });
    }
    
}