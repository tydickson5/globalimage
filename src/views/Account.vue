<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title>account</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
        <br/>
        <div v-for="(u, user) in user">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ u[1].name }}</ion-title>
                    
                </ion-toolbar>
                
            </ion-header>
            
        </div><br/>
        <ion-segment value="future" color="primary" @ionChange="handleEvent()">
            <ion-segment-button value="future">
                <ion-label>future posts</ion-label>
            </ion-segment-button>
            <ion-segment-button value="old">
                <ion-label>old posts</ion-label>
            </ion-segment-button>
        </ion-segment>
        <div id="future_posts">
            <ion-card color="primary">
                <ion-card-content>
                    <ion-text>image</ion-text>
                    <ion-text>duration</ion-text>
                    <ion-text>time untill post</ion-text>
                </ion-card-content>
            </ion-card>
            <div v-for="(post, futureposts) in futureposts">
                <ion-card>
                    <ion-card-content>
                        <img :src="'data:image/jpg;base64,' + post.data[2].image">
                        <ion-text v-if="post.data[5].duration == 1">1 minute</ion-text>
                        <ion-text v-if="post.data[6].timetillpost < 60">{{ post.data[6].timetillpost }} minutes</ion-text>
                        <ion-text v-if="post.data[6].timetillpost < 1439 && post.data[6].timetillpost >= 60">{{ Math.floor(post.data[6].timetillpost / 60) }} hours</ion-text>
                        <ion-text v-if="post.data[6].timetillpost >= 1439" >{{ Math.floor(post.data[6].timetillpost / 1440) }} days</ion-text>
                    </ion-card-content>
                </ion-card>
                
            </div>
            <ion-infinite-scroll @ion-infinite="ionInfinite">
                <ion-infinite-scroll-content></ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </div>
        <div id="old_posts">
            <ion-card color="primary">
                <ion-card-content>
                    <ion-text>image</ion-text>
                    <ion-text>duration</ion-text>
                    <ion-text>time since post</ion-text>
                </ion-card-content>
            </ion-card>
            <div v-for="(post, oldposts) in oldposts">
                <ion-card>
                    <ion-card-content>
                        <img :src="'data:image/jpg;base64,' + post.data[2].image">
                        <ion-text v-if="post.data[5].duration == 1">1 minute</ion-text>
                        <ion-text v-if="post.data[6].timetillpost < 60">{{ post.data[6].timetillpost }} minutes</ion-text>
                        <ion-text v-if="post.data[6].timetillpost < 1439 && post.data[6].timetillpost >= 60">{{ Math.floor(post.data[6].timetillpost / 60) }} hours</ion-text>
                        <ion-text v-if="post.data[6].timetillpost >= 1439" >{{ Math.floor(post.data[6].timetillpost / 1440) }} days</ion-text>
                    </ion-card-content>
                </ion-card>
                <ion-infinite-scroll @ion-infinite="ionInfinite2">
                    <ion-infinite-scroll-content></ion-infinite-scroll-content>
                </ion-infinite-scroll>
            </div>
        </div>
        

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardContent, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonButton} from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import { getUser } from '../httpRequests/signinRequests.js';
import { getFuturePosts } from '../httpRequests/postRequests.js';
import { cog, ellipseSharp } from 'ionicons/icons';


export default defineComponent({
    components: {
        IonPage,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonText,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
        IonCard,
        IonCardContent,
        IonIcon,
        IonSegment,
        IonSegmentButton,
        IonLabel,
        IonButton
    },
    data() {
        return{
            page: 1
        }
    },
    methods: {
        
    },
    setup(){

        var userid = sessionStorage.getItem('userid');

        const user = reactive([]);

        async function findUser(id){
            var u = await getUser(id);
            user.push(u.user);
        }


        findUser(sessionStorage.getItem('userid'))


        //future posts
        const futureposts = reactive([]);
        var lastid = null;
        var moreposts = true;
        let count = 1;

        async function findFPosts(){
            for(let i = 0; i < 10; i++){
                var p = await getFuturePosts(userid, count, true);
                count++;
                if(p.data[0].id == lastid){
                    moreposts = false;
                }
                lastid = p.data[0].id;
                if(moreposts != false){
                    futureposts.push(p);
                }
                //console.log(p);
            }
        }

        const ionInfinite = (event) => {
            //console.log(search);
            findFPosts();
            setTimeout(() => event.target.complete(), 500);
        };

        findFPosts();


        //old posts
        const oldposts = reactive([]);
        var lastid2 = null;
        var moreposts2 = true;
        let count2 = 1;

        async function findOPosts(){
            for(let i = 0; i < 10; i++){
                var p = await getFuturePosts(userid, count, false);
                count2++;
                if(p.data[0].id == lastid2){
                    moreposts2 = false;
                }
                lastid2 = p.data[0].id;
                if(moreposts2 != false){
                    oldposts.push(p);
                }
                //console.log(p);
            }
        }

        const ionInfinite2 = (event) => {
            //console.log(search);
            findOPosts();
            setTimeout(() => event.target.complete(), 500);
        };

        findOPosts();


        //page change
        var page = 1

        function handleEvent(){
            page *= -1
            if(page == -1){
                document.getElementById("future_posts").style.display = 'none';
                document.getElementById("old_posts").style.display = 'block';
            }
            else{
                document.getElementById("future_posts").style.display = 'block';
                document.getElementById("old_posts").style.display = 'none';
            }
        }

        return {user, futureposts, ionInfinite, oldposts, ionInfinite2, cog, handleEvent}
      
    },
    mounted(){

        
        
        
    }
});
</script>

<style scoped>

ion-card-content{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

img{
    width: 50px;
    height: 50px;
    border-radius: 10px;
}

#account_info{
    text-align: center;
}

ion-button{
    margin-right: 2.5%;
}

ion-segment{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}

#old_posts{
    display: none;
}

</style>