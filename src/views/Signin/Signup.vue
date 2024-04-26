<template>
    <ion-page>
        <ion-header>
            <ion-toolbar collapse="condense">
                <ion-back-button default-href="pageDefaultBackLink" slot="start"></ion-back-button>
                <ion-title>sign up</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div id="signup_form">
                <form class="ion-padding" action="">
                    <ion-input type="email" name ='email' placeholder="email" v-model="inputEmail" :clear-input="true" @click="haptic('light')"></ion-input><br/>
                    <ion-button color="primary" @click="confirmEmail" expand="block">send confirmation email</ion-button>
                </form>
                <form class="ion-padding">
                    <ion-input type="password" name="password" placeholder="password" v-model="inputPassword" :clear-input="true" @click="haptic('light')"></ion-input><br/>
                    <ion-input type="password" name="confirmPassword" placeholder="confirm password" v-model="inputConfirmPassword" :clear-input="true" @click="haptic('light')"></ion-input><br/>
                    <ion-input type="text" name="username" placeholder="username" v-model="inputUsername" :clear-input="true" maxlength="10" @click="haptic('light')"></ion-input><br/>
                    <ion-input type="number" name="code" placeholder="email code" v-model="inputSignUpCode" :clear-input="true" @click="haptic('light')"></ion-input><br/>
                    <ion-text><p>by signing up, i accept the <a @click="openTerms()">Terms and Conditions</a> and <a @click="openAgreement()">User Agreement</a></p></ion-text><br/><br/>
                    <ion-button color="primary" @click="signupForm" expand="block">signup</ion-button>
                </form>
            </div>
            
        </ion-content>
    </ion-page>
</template>

<script>
import { 
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInput,
    IonButton,
    IonText,
    IonBackButton,
    IonCheckbox
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { Storage } from '@ionic/storage';
import { makeToast, makeHaptic } from '../../scripts/toast.js';
import { set } from '../../scripts/storageController.js'
import { sendSignupEmail, signup } from '../../httpRequests/signinRequests.js';
import { Browser } from '@capacitor/browser';

export default defineComponent({
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
        IonCheckbox
    },
    methods: {
        async openTerms(){
            await Browser.open({ url: 'https://www.app2.website/termsofservice.php' });
        },
        async openAgreement(){
            await Browser.open({ url: 'https://www.app2.website/useragreement.php' });
        },
        haptic(type){
            makeHaptic(type);
        },
        async confirmEmail(){
            makeHaptic('medium');
            var response = await sendSignupEmail(this.inputEmail);
            //console.log(response);
            if(response.success == true){
                var email = response.data[0].email;
                var code = response.data[1].code;
                //console.log(email + " " + code);

                this.signUpCode = code;
                makeToast('verification email sent', 'success');
            }
            else{
                //console.log(response.reason);
                makeToast(response.reason, 'danger');
            }
            
        },
        async signupForm(){
            makeHaptic('medium');
            if(this.signUpCode == this.inputSignUpCode){
                var sessionStorage = window.sessionStorage;
                //console.log("good code");

                var response = await signup(this.inputEmail, this.inputPassword, this.inputConfirmPassword, this.inputUsername);
                console.log(response);

                if(response.success == false){
                    makeToast(response.reason, 'danger');
                }
                else{
                    var id = response.data[0].id;
                    var public_key = response.data[1].public_key;

                    set('userid', id, sessionStorage);
                    set('userpublickey', public_key, sessionStorage);

                    makeToast('hello ' + this.inputUsername, 'success');
                    this.$router.push('/');
                }
            }
            else{
                //console.log('wrong sign up code');
                makeToast('wrong email code', 'danger');
            }
        }
    },
    data(){
        return{
            inputEmail: '',
            inputPassword: '',
            inputConfirmPassword: '',
            inputUsername: '',
            signUpCode: '',
            inputSignUpCode: '',
        }
    }
});
</script>

<style scoped>

#signup_form{
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-60%);
}

ion-input{
    --padding-start: 10px;
}

</style>