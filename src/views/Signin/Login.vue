<template>
    <ion-page>
        <ion-header>
            <ion-toolbar collapse="condense">
                <ion-back-button default-href="pageDefaultBackLink" slot="start"></ion-back-button>
                <ion-title>login</ion-title>
                
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div id="login_form">
                <form class="ion-padding" action="">
                    <ion-input color="light" type="email" name ='email' placeholder="email" v-model="inputEmail" :clear-input="true"></ion-input><br/>
                    <ion-input color="light" type="password" placeholder="password" id="inputPassword" v-model="inputPassword" :clear-input="true"></ion-input><br/>
                    <br/><ion-button color="primary" @click="login" expand="block">submit</ion-button>
                </form><br/>
                <div id="center_text">
                    <ion-text color="primary" router-link="/signup">create account</ion-text>
                </div>
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
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { makeToast } from '../../scripts/toast.js';
import { checkLogin } from '../../httpRequests/signinRequests.js';
import { set } from '../../scripts/storageController.js'


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
    },
    methods: {
        async login(){
            var login = await checkLogin(this.inputEmail, this.inputPassword);
            console.log(login);
            var success = login.success;
            if(success == true){
                var id = login.user[0].id;
                var name = login.user[1].name;
                var pk = login.user[2].public_key;
                var sessionStorage = window.sessionStorage;

                set('userid', id, sessionStorage);
                set('userpublickey', pk, sessionStorage);

                makeToast('hello ' + name);
                this.$router.push('/');
            }
            else{
                makeToast('incorrect email or password');
            }
        },
    },
    data(){
        return{
            inputEmail: '',
            inputPassword: ''
        }
    },
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

#center_text{
    text-align: center;
}

</style>