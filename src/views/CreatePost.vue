<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>create post</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">create post</ion-title>
                    <ion-button color="primary" class="take_picture" id="take_picture_button" @click="takePicture" slot="end">
                        <ion-icon :icon="camera" size="small"></ion-icon>
                    </ion-button>
                    <ion-button color="primary" class="take_picture" @click="deletePost()" slot="end">
                        <ion-icon :icon="trash" size="small"></ion-icon>
                    </ion-button>
                </ion-toolbar>
            </ion-header>
            <br/>
            <div id="main_content">
                <div id="add_image">
                    
                    
                </div><br/>
                <div id="new_image_div">
                    <img id="new_image" src=""><br/><br/>
                </div><br/>
                <ion-radio-group value="1-free" id="rgroup">
                    <ion-radio value="1-free" label-placement="end">1 minute free</ion-radio>
                    <ion-radio value="1-payed" label-placement="end">1 minute $1.99</ion-radio>
                    <ion-radio value="5-payed" label-placement="end">5 minutes $7.99</ion-radio>
                </ion-radio-group>
                <ion-button id="submit_button" expand="block" @click="makePurchase()">post</ion-button>
            </div>
            
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonText, IonButton, IonAlert, IonRadio, IonRadioGroup } from '@ionic/vue';
import { defineComponent } from 'vue';
import { camera, trash } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';
import { makeToast, makeHaptic } from '../scripts/toast.js';
import {Purchases} from "@revenuecat/purchases-capacitor"; 


export default defineComponent({
    name: "Create Post",
    components: {
        IonContent,
        IonPage,
        IonToolbar,
        IonTitle,
        IonHeader,
        IonIcon,
        IonText,
        IonButton,
        IonAlert,
        IonRadio,
        IonRadioGroup
    },
    methods: {

        async takePicture(){
            makeHaptic('light');
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64,
                width: 1080,
                height: 1920
            });
            document.getElementById('new_image').src = "data:image/jpg;base64," + image.base64String;
            
            this.postImage = image.base64String;
            
            
        },
        async submitPost(d, payed){
            //console.log('dkfjasdklfjsdklfjkldsjfklsdjfksdjf');

            if(this.postImage != ''){

                var userid = sessionStorage.getItem('userid');
                var pk = sessionStorage.getItem('userpublickey')
                console.log(userid);
                console.log(pk);
                var duration = d;

                console.log(payed);
                //const file = document.getElementsByName('postfile')[0].files[0];
                const formData = new FormData();

                //console.log(this.inputImageFile);

                formData.append('userid', userid);
                formData.append('the_file', this.postImage);
                formData.append('duration', duration);
                formData.append('payed', payed);
                formData.append('app_key', import.meta.env.VITE_APP_API_CONFIRMATION_KEY);
                formData.append('public_key', sessionStorage.getItem('userpublickey'));

                const url2='https://canvassed.net/globalimage_backend/Post/newPost.php';
                var postrequestparams = {
                    "method": "POST",
                    "body": formData
                }
                var u = await fetch(url2, postrequestparams);

                var ur = await u.json();
                console.log(ur);

                if(ur.success == true){
                    makeToast('success', 'success');
                    document.getElementById('new_image').setAttribute('src', "");
                    //document.getElementById('camera_button_text').innerText = "add image";
                    this.postImage = '';
                    this.$router.push('/');
                }
                else if(ur.success == false && ur.reason == "no more free posts"){
                    makeToast('you are out of free posts', 'danger')
                }
                else{
                    makeToast('error', 'danger');
                    //console.log(ur);
                }
            }
            else{
                makeToast('no image', 'danger');
            }
        },
        async deletePost(){
            makeHaptic('light');
            document.getElementById('new_image').setAttribute('src', "");
            //document.getElementById('camera_button_text').innerText = "add image";
            this.postImage = '';
        },
        async makePurchase(){
            makeHaptic('medium');
            if(this.postImage != ''){
                var offering = null;
                var duration = null;
                var payed = false;
                if(document.getElementById('rgroup').value == '1-free'){
                    duration = 1;
                    payed = true;
                }
                else if(document.getElementById('rgroup').value == '1-payed'){
                    offering = 'post_one';
                    duration = 1;
                    payed = false;
                }
                else{
                    offering = 'post_five';
                    duration = 5;
                    payed = false;
                }
                console.log(duration);
                if(payed == false){
                    try {
                        const offerings = await Purchases.getOfferings();
                        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {  
                            // Display packages for sale
                            var product = offerings.all[offering].availablePackages[0];

                            //console.log('f32f23f23f3');
                        }
                    } catch (error) {
                        // Handle error
                        console.log('error');
                        //makeToast('pay');
                    }

                    try {
                        //console.log('fsdfds');
                        const purchaseResult = await Purchases.purchasePackage({ aPackage: product });
                        //console.log('39r3290ur239hf923hf932hf903fh');
                        var response = this.submitPost(duration, true);
                        if(response.success == true){
                            makeToast("post made", 'success');
                        }
                        else{
                            makeToast('error', 'danger');
                        }
                    } catch (error) {
                        //console.log('fdsfds');
                        if (error.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
                            makeToast('payment cancelled', 'danger')
                        } else {
                            makeToast('payment error', 'danger');
                        }
                    }
                }
                else{
                    this.submitPost(duration, false);
                }
            }
            else{
                makeToast('no image', 'danger');
            }
        }
    },
    data(){
        return{
            postImage: '',
        }
    },
    setup(){
        return {camera, trash}
    }
  
});

</script>

<style scoped>

#main_content{
    width: 95%;
    margin-left: auto;
    margin-right: auto;
}

#add_image{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#take_picture{
    border-radius: 10px;
}

#take_picture_button{
    display: flex;
    align-items: center;
}

#take_picture_button ion-text{
    margin-left: 5px;
}

#submit_button{
    position: fixed;
    bottom: 20px;
    width: 95%;
}

img{
    border-radius: 10px;
}

ion-radio-group{
    position: fixed;
    bottom: 100px;
}
ion-radio {
    --border-radius: 4px;
    --inner-border-radius: 4px;

    --color: #ddd;
    --color-checked: #54826f;
    margin-right: 25px;

    
}

ion-radio.ios::part(container) {
    width: 20px;
    height: 20px;

    border: 2px solid #ddd;
    border-radius: 4px;
}

.radio-checked.ios::part(container) {
    border-color: #54826f;
}

</style>