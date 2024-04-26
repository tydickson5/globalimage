<template>
    <ion-page>
        <ion-header>
            <ion-toolbar collapse="condense">
                <ion-back-button default-href="pageDefaultBackLink" slot="start"></ion-back-button>
                <ion-title>settings</ion-title>
                
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div id="login_form">
                <form class="ion-padding" action="">
                    <ion-text>@<ion-input color="light" type="text" name ='instagram' placeholder="new instagram" v-model="inputInstagram" :clear-input="true" @click="haptic('light')"></ion-input><br/></ion-text><br/>
                    <ion-text>@<ion-input color="light" type="text" name ='tiktok' placeholder="new tiktok" v-model="inputTiktok" :clear-input="true" @click="haptic('light')"></ion-input><br/></ion-text><br/>
                    <ion-input color="light" type="password" name ='password' placeholder="new password" v-model="inputPassword" :clear-input="true" @click="haptic('light')"></ion-input><br/>
                    <br/><ion-button color="primary" @click="update()" expand="block">update</ion-button>
                    <br/><ion-button color="primary" router-link="/login" expand="block" @click="haptic('light')">change account</ion-button>
                    <br/><ion-button id="present_alert" color="danger" expand="block" @click="haptic('light')">delete account</ion-button>
                    <ion-alert trigger="present_alert" header="delete account" :buttons="alertButtons"></ion-alert>
                </form><br/>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { 
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonInput,
    IonButton,
    IonText,
    IonBackButton,
    IonAlert
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { makeToast, makeHaptic } from '../../scripts/toast.js';
import { updateInstagram, updateTiktok, updatePassword, deleteAccount } from '../../httpRequests/userRequests.js';


export default defineComponent({
    name: "Login",
    components: {
        IonPage,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonInput,
        IonButton,
        IonText,
        IonBackButton,
        IonAlert
    },
    methods: {
        async update(){
            makeHaptic('medium');

            var userid = sessionStorage.getItem('userid');

            if(this.inputInstagram != ''){
                var response = await updateInstagram(userid, this.inputInstagram);
                console.log(response)
            }
            if(this.inputTiktok != ''){
                var response = await updateTiktok(userid, this.inputTiktok);
                console.log(response)
            }
            if(this.inputPassword != ''){
                var response = updatePassword(userid, this.inputPassword);
                console.log(response)
            }

            makeToast('updated', 'success');
        },
        haptic(type){
            makeHaptic(type);
        }
    },
    data(){
        return{
            inputInstagram: '',
            inputTiktok: '',
            inputPassword: ''
        }
    },
    setup(){
        var userid = sessionStorage.getItem('userid');

        const alertButtons = [
            {
                text: 'delete',
                role: 'delete',
                handler: async () => {
                    var response = await deleteAccount(userid);
                    console.log(response)
                    if(response.success == true){
                        this.$router.link('/login');
                        makeToast('account deleted', 'success');
                    }
                    else{
                        console.log('error');
                        makeToast('error', 'danger');
                    }
                }
            },
            {
                text: 'cancel',
                role: 'cancel',
                handler: () => {
                    console.log('cancelled', 'danger');
                }
            }
        ]

        return{alertButtons}
    }
});
</script>

<style scoped>

#login_form{
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-60%);
}

ion-input{
    --padding-start: 10px;
}

ion-text{
    display: flex;
    align-items: center;
}

#center_text{
    text-align: center;
}

</style>