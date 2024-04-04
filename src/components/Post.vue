<template>
    <ion-card color="light">
        <ion-card-content>
            
            
        </ion-card-content>

    </ion-card>
</template>

<script>
import { 
    IonInput,
    IonButton,
    IonText,
    IonCard,
    IonCardContent,
    IonItem
} from '@ionic/vue';
import { defineComponent } from 'vue';
import UserProfile from './UserProfile.vue';
import { makeToast } from '../scripts/toast.js';
 

export default defineComponent({
    props: {
        item: {
            required: true,
        }
    },
    components: {
        IonInput,
        IonButton,
        IonText,
        IonCard,
        IonCardContent,
        IonItem,
        UserProfile,
        Report
    },
    methods: {


    }
});
</script>



<style scoped>


ion-card{
    width: 100%;

}

ion-button{
    border: 2px solid #ffffff;
    border-radius: 8px;
    width: 100%;
    height: 50px;
    white-space:normal !important;
    word-wrap:break-word;
}

</style>
  