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
                <ion-button @click="submitPost()" expand="block">post</ion-button>
            </div>
            
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonText, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { camera, trash } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';
import { makeToast } from '../scripts/toast.js';

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
    },
    methods: {
        async takePicture(){
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64
            });

            // image.webPath will contain a path that can be set as an image src.
            // You can access the original file using image.path, which can be
            // passed to the Filesystem API to read the raw data of the image,
            // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
            //var imageUrl = image.webPath;
            //console.log(image.base64String);

            // Can be set to the src of an image now
            document.getElementById('new_image').src = "data:image/jpg;base64," + image.base64String;
            document.getElementById('camera_button_text').innerText = "retake image";
            
            this.postImage = image.base64String;
            
            
        },
        async submitPost(){

            if(this.postImage != ''){

                //var userid = 
                var userid = 1;
                var duration = 1;

                //const file = document.getElementsByName('postfile')[0].files[0];
                const formData = new FormData();

                //console.log(this.inputImageFile);

                formData.append('userid', userid);
                formData.append('the_file', this.postImage);
                formData.append('duration', duration);
                formData.append('app_key', import.meta.env.VITE_APP_API_CONFIRMATION_KEY);
                //formData.append('public_key', sessionStorage.getItem('userpublickey'));
                formData.append('public_key', '123');

                const url2='https://canvassed.net/globalimage_backend/Post/newPost.php';
                var postrequestparams = {
                    "method": "POST",
                    "body": formData
                }
                var u = await fetch(url2, postrequestparams);

                var ur = await u.json();
                console.log(ur);

                if(ur.success == true){
                    makeToast('success');
                    document.getElementById('new_image').src = "";
                    //document.getElementById('camera_button_text').innerText = "add image";
                    this.postImage = '';
                    //this.$router.push('/');
                }
                else{


                    makeToast('error');
                    
                    
                    //console.log(ur);
                }
            }
            else{
                makeToast('no image');
            }
        },
        async deletePost(){
            document.getElementById('new_image').src = "";
            //document.getElementById('camera_button_text').innerText = "add image";
            this.postImage = '';
        }
    },
    data(){
        return{
            postImage: '',
        }
    },
    setup(){
        /*
        async function makePurchase(id){
        try {
            const offerings = await Purchases.getOfferings();
            if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {  
                // Display packages for sale
                var product = offerings.all["month_premium"].availablePackages[0];
            }
        } catch (error) {
            // Handle error
            //console.log('error');
            //makeToast('pay');
        }

        try {
            const purchaseResult = await Purchases.purchasePackage({ aPackage: product });
            if (typeof purchaseResult.customerInfo.entitlements.active['month_premium'] !== "undefined") {
                // Unlock that great "pro" content
                //console.log('worked');
                //console.log(id);
                var response = this.submitPost(userid, this.postImage);
                if(response.success == true){
                    makeToast("post made");
                }
                else{
                    makeToast('error');
                }
                //Purchases.setAttributes({"name": id});
                //console.log(response);
            }
        } catch (error) {
            if (error.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
                // Purchase cancelled
                //console.log('purchase cancelled');
            } else {
                // Error making purchase
                //console.log('purchase error');
                makeToast('payment error');
            }
        }
        }
        */

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

</style>