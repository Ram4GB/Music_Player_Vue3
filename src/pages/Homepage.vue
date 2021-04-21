<template>
  <div class="container">
    <div class="d-flex my-4" >
      <h3 style="color: #e64a19;font-weight: bold">Danh mục bài hát</h3>
      <div style="margin-left: auto">
        <button v-on:click="showModal()" class="btn btn-music-normal">Bật modal thông báo</button>
        <button class="btn btn-music-primary">Phát tất cả</button>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-4">
          <slider />
        </div>
        <div class="col-8">
          <div class="music-list">
            <div v-for="music in listMusic" :key="music.id" @click="playMusic(music)" class="music-list-item" :class="{isActive: currentMusic && currentMusic.id == music.id ? true :  false}">
              <div class="col-2" style="display: flex;align-items: center">
                <div style="position: relative; display: inline-block; overflow: hidden;border-radius: 50%">
                  <div class="img" :style="{backgroundImage: 'url(' + music.image + ')'}"></div>
                  <i class="fas fa-play-circle play-icon"></i>
                </div>
              </div>
              <div class="col-4">
                <div style="margin-right: 20px">
                  <p style="font-weight: bold; color: #ac0800; text-transform: uppercase;margin-bottom: 3px
                            ;white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;">
                            {{ music.name }}
                  </p>
                  <p>{{ music.author }}</p>
                </div>
              </div>
              <div class="col-2">
                <p>03:05</p>
              </div>
              <div class="col-4">
                <div class="d-flex justify-content-end">
                  <i style="margin-right: 5px" class="fas fa-heart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="waveform"></div>
    <div class="music-player">
      <div class="block-1 d-flex align-items-center" style="flex:1">
        <img v-bind:class="{active: isPlaying}" :src="currentMusic.image ? currentMusic.image : 'https://i.pinimg.com/originals/4a/7f/73/4a7f73035bb4743ee57c0e351b3c8bed.jpg'" alt="">
        <div>
          <p class="name">{{ currentMusic.name }}</p>
          <p class="author">{{ currentMusic.author }}</p>
        </div>
      </div>
      <div class="block-2" style="flex:1">
        <div class="d-flex justify-content-center mb-1">
          <span>{{ getCurrentTime ? getCurrentTime : "0:0" }}</span>
          <input min="0" v-bind:max="duration" @change="handleChangeSeek()" v-model="currentTime" step="0.1" style="width: 100%" type="range">
          <span>{{ getDuration ? getDuration : "0:0"  }}</span>
        </div>
        <div class="controls d-flex justify-content-between">
          <button @click="setLoop()" class="button" v-bind:class="{ active: isRepeat }">
            <i class="fas fa-redo"></i>
          </button>
          <button @click="previous()" class="button">
            <i class="fas fa-backward"></i>
          </button>
          <button class="button" @click="play()" v-if="isPlaying == false">
            <i class="fas fa-play-circle"></i>
          </button>
          <button class="button" v-else @click="pause()">
            <i class="fas fa-pause-circle"></i>
          </button>
          <button class="button" @click="next()" type="button">
            <i class="fas fa-forward"></i>
          </button>
          <!-- <button @click="setRandom()" class="button" v-bind:class="{ active: isRandom }">
            <i class="fas fa-random"></i>
          </button> -->
          <button v-if="!isFullScreen" @click="expandScreen()" class="button">
            <i class="fas fa-expand"></i>
          </button>
          <button @click="exitFullScreen()" v-else class="button">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
        <div class="bar"></div>
      </div>
      <div class="block-3 justify-content-end d-flex" style="flex:1">
        <div class="d-flex align-items-center">
          <i class="fas fa-volume-off"></i>
          <input style="margin: 0px 5px" @change="handleChangeValue()" v-model="volume" min="0" max="1" step="0.2" type="range">
          <i class="fas fa-volume-up"></i>
        </div>
      </div>
    </div>
  </div>
  <div id="my-fly-bird" class=""></div>
  <div class="snowflakes" aria-hidden="true">
    <div class="snowflake">
    ❅
    </div>
    <div class="snowflake">
    ❅
    </div>
    <div class="snowflake">
    ❆
    </div>
    <div class="snowflake">
    ❄
    </div>
    <div class="snowflake">
    ❅
    </div>
    <div class="snowflake">
    ❆
    </div>
    <div class="snowflake">
    ❄
    </div>
    <div class="snowflake">
    ❅
    </div>
    <div class="snowflake">
    ❆
    </div>
    <div class="snowflake">
    ❄
    </div>
  </div>
  <modal v-bind:isShow="isShow" v-bind:hideModal="hideModal">
    <template v-slot:introduceString>
      <p>Nhóm 14 xin chào thầy và các bạn</p>
      <div id="tag">Nhóm 5 Music</div>
      <div class="linkMember">Xem người đóng góp</div>
    </template>
  </modal>
</template>

<script>
import { Howl } from 'howler'
import music1 from "@/data/1.mp3";
import music2 from "@/data/2.mp3";
import music3 from "@/data/3.mp3";
import music4 from "@/data/4.mp3";
import music5 from "@/data/5.mp3";
import music6 from "@/data/6.mp3";

import { reactive, ref } from 'vue';
import slider from '../components/Slider'
import modal from '../components/Modal'

export default {
  components: {
    slider,
    modal
  },
  data: function() {
    return {
      volume: 1,
      animation: false,
      cursor_left: null,
      cursor_bottom: null,
    }
  },
  computed: {
    getCurrentTime: function() {
      if(this.currentTime)
        return Math.floor(this.currentTime / 60) + ":" + Math.floor(this.currentTime % 60)
      return null
    },
    getDuration: function() {
      if(this.duration)
        return Math.floor(this.duration / 60) + ":" + Math.floor(this.duration % 60)
      return null
    }
  },
  mounted: function() {
    document.addEventListener('mousemove', (event) => {
      this.cursor_left = event.pageX
      this.cursor_bottom = event.pageY
    })
  },
  unmounted: function() {
    this.stop()
  },
  updated: function() {
    
  },
  methods: {
    handleClick: function() {
      alert(123)
    },
    playMusic: function(music) {
      console.log(music)
      console.log(this.cursor_left, this.cursor_bottom)
      document.getElementById('my-fly-bird').style.display = "block"
      document.getElementById('my-fly-bird').style.backgroundImage = `url("${music.image}")`
      document.getElementById('my-fly-bird').classList.add("animation-fly")
      document.getElementById('my-fly-bird').style.setProperty('--left', this.cursor_left + 'px');
      document.getElementById('my-fly-bird').style.setProperty('--bottom', this.cursor_bottom + 'px');
      document.getElementById('my-fly-bird').style.setProperty('--image', music.image);
      setTimeout(() => {
        document.getElementById('my-fly-bird').classList.remove("animation-fly")
        document.getElementById('my-fly-bird').style.display = "none"
        this.play(music)
      }, 2000)
    },
    handleChangeValue: function() {
      if(this.currentMusic.howl) {
        this.currentMusic.howl.volume(this.volume)
      }
    },
    handleChangeSeek: function() {
      if(this.currentMusic.howl) {
        this.currentMusic.howl.seek(this.currentTime)
        console.log(this.currentTime / this.duration)
        this.wavesurfer.seekTo(this.currentTime / this.duration)
      }
    },
    expandScreen: function() {
      let element = document.getElementById('app')
      if (element.requestFullscreen) {
        element.requestFullscreen();
        this.isFullScreen = true
      } else if (element.webkitRequestFullscreen) { 
        element.webkitRequestFullscreen();
        this.isFullScreen = true
      } else if (element.msRequestFullscreen) { 
        element.msRequestFullscreen();
        this.isFullScreen = true
      }
    },
    exitFullScreen: function() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.isFullScreen = false
      } else if (document.webkitExitFullscreen) { 
        document.webkitExitFullscreen();
        this.isFullScreen = false
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        this.isFullScreen = false
      }
    }
  },
  setup: function() {
    let currentMusic = reactive({
      id: null,
      name: null,
      author: null,
      src: null,
      howl: null,
    })

    // let isRandom = ref(false)
    let isRepeat = ref(false)
    let playId = ref(null)
    let duration = ref(null)
    let currentTime = ref(null)
    let isFullScreen = ref(null)
    let wavesurfer = ref(null)
    let isShow = ref(false)

    let listMusic = [
          {
              id: 0,
              name: "If you dont call",
              author: "Sol",
              src: music1,
              image: 'https://i1.sndcdn.com/avatars-000577547277-ire2n5-t120x120.jpg'
          },
          {
              id: 1,
              name: "I dont know the song",
              author: "Korean singer",
              src: music2,
              image: 'https://image.shutterstock.com/image-vector/korean-flag-260nw-129071321.jpg'
          },
          {
              id: 2,
              name: "Rolling in the deep",
              author: "Adell",
              src: music3,
              image: 'https://upload.wikimedia.org/wikipedia/vi/5/5d/Adele-Rolling_In_The_Deep.jpg'

          },
          {
              id: 3,
              name: "Crush",
              author: "W/n ft An An",
              src: music4,
              image: 'https://avatar-ex-swe.nixcdn.com/song/2018/07/11/6/b/a/3/1531291715954_640.jpg'
          },
          {
              id: 4,
              name: "Masew x RedT - Mộng Mơ Official MV",
              author: 'Masew',
              src: music5,
              image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/7/2/3/8/7238e9f5efbfcb38f3376b906f6ff1d3.jpg'
          },
          {
              id: 5,
              name: "TÌNH BẠN DIỆU KỲ - AMEE x Ricky Star x Lăng LD ( Masew Remix )",
              author: 'Masew',
              src: music6,
              image: 'https://i1.sndcdn.com/artworks-2K2HkNiHEP0Bbi2R-pPHyAQ-t500x500.jpg'
          }
    ]
    
    const isPlaying = ref(false)

    const play = function(item) {
      // kiểm tra có bài hát hay không
      if(!item && !currentMusic.howl) {
        alert("Mời chọn bài hát")
        return
      }
      if(item) {
        if(currentMusic.howl) {
          // không load cái đoạn nhạc đang chạy
          currentMusic.howl.unload()
        }
        currentMusic.id = item.id
        currentMusic.name = item.name
        currentMusic.author = item.author
        currentMusic.src = item.src
        currentMusic.image = item.image
        currentMusic.howl =  new Howl({
          src: [item.src],
          onplay: function() {
            // khi chạy 1 bài hát nó sẽ liên tục set lại currentTime thông qua việc bật on('play') chỉ 1 lần thôi 
            // và nó sẽ chạy interval
            // play -> end
            // play -> end -> repeat -> play ...
            clearInterval(window.interval)
            // sóng nhạc
            if(wavesurfer.value) {
              wavesurfer.value.destroy()
            }
            wavesurfer.value = window.WaveSurfer.create({
              container: '#waveform',
              waveColor: '#003c8f',
              progressColor: '#ff7d47',
              responsive: true,
              interact: false,
              barWidth: 2,
              barHeight: 1,
              barGap: null
            })
            wavesurfer.value.load(currentMusic.src);
            wavesurfer.value.on('ready', function () {
                wavesurfer.value.play();
                wavesurfer.value.setMute()
            });
            window.interval = setInterval(() => {
              duration.value = currentMusic.howl.duration()
              currentTime.value = currentMusic.howl.seek()
              wavesurfer.value.seekTo(currentTime.value / duration.value)
            }, 1000)
          },
          onend: function() {
            // khi kết thúc thì nó sẽ kiểm tra điều kiện là có nên random hay không?
            // còn lặp thì mình đã set trong hàm luôn rồi, nó nhớ và nó chạy lại
            clearInterval(window.interval)
            duration.value = null
            currentTime.value = 0

            // nếu mà mình không unload và destroy thì nó sẽ loop liên tục
            if(!isRepeat.value) {
              isPlaying.value = false
              wavesurfer.value.destroy()
              currentMusic.howl.unload()
            } 
          }
        })

        playId.value = currentMusic.howl.play() 
        isPlaying.value = true
        isRepeat.value = false
      } else {
        isPlaying.value = true
        isRepeat.value = false
        // sóng nhạc
        wavesurfer.value.playPause()
        playId.value = currentMusic.howl.play()
      }      
    }

    const pause = function() {
      // kiểm tra có bài hát hay không
      if(!currentMusic.howl) {
        alert("Mời chọn bài hát")
        return
      }

      isPlaying.value = false
      currentMusic.howl.pause()
      // sóng nhạc 
      wavesurfer.value.playPause()
    }

    const next = function() {
      let index = currentMusic.id + 1
      if(index < listMusic.length) {
        play(listMusic[index])
      } else {
        play(listMusic[0])
      }
    }

    const previous = function() {
      let index = currentMusic.id - 1
      if(index >= 0) {
        play(listMusic[index])
      } else {
        play(listMusic[listMusic.length - 1])
      }
    }

    const setLoop = () => {
      if(!currentMusic.howl) {
        alert("Mời bạn chọn bài hát")
      }

      if(currentMusic.howl.loop() === true) {
        isRepeat.value = false
        currentMusic.howl.loop(false)
      } else {
        isRepeat.value = true
        currentMusic.howl.loop(true)
      }
    }

    const stop = () => {
      clearInterval(window.interval)
      duration.value = null
      currentTime.value = 0
      isPlaying.value = false
      if(wavesurfer.value) {
        wavesurfer.value.destroy()
      }
      if(currentMusic.howl) {
        currentMusic.howl.unload()
      }
    }

    const showModal = () => {
      isShow.value = true
    }

    const hideModal = () => {
      isShow.value = false
    }

    return {
      play, pause, next, previous, setLoop, stop,
      currentMusic, duration, currentTime,
      isPlaying,
      listMusic,
      isRepeat,
      playId,
      isFullScreen,
      wavesurfer,
      showModal, hideModal,
      isShow
    }

    
  }
}
</script>

<style>
  .btn-music-normal {
    background-color: #fff;
    border: 1px solid #003c8f; 
    color: #111;
  }

  .btn-music-primary {
    background-color:#5e92f3;
    color: #fff;
  }

  .btn-music-primary:hover{ 
    background-color:#003c8f;
    color: #fff;
  }

  .btn {
    border-radius: 20px;
    margin: 0px 3px;
  }

  .music-list { 
    height: 350px;
    overflow-y: scroll;
    padding: 0px 10px;
    border: 1px solid #111;
  }

  .music-list-item {
    margin: 8px auto;
    display: flex;
    border: 1px solid gray;
    padding: 0px 5px;
    align-items: center;
    max-width: 1000px;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.5s;
  }

  .music-list-item .fa-play-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    color: #fff;
  }

  .music-list-item.isActive {
    background: #5e92f3;
    border: 1px solid #003c8f;
  }

  .music-list-item:hover {
    background: #5e92f3;
    border: 1px solid #003c8f;
    color: #fff;
  }

  .music-list-item:hover .fa-play-circle {
    display: block;
    color: #fff;
  }

  .music-list-item .img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    transition: 0.5s;
  }

  .music-list-item:hover .img {
    transform: scale(1.1);
  }

  .music-player {
    display: flex;
    margin-top: 30px;
    justify-content: space-between;
    align-items: center;
    /* background-color: #003c8f; */
    padding: 5px 40px;
    color: #111;
    margin-left: auto;
    margin-right: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    border-top: 2px solid #111;
  }

  .music-player .author {
    margin-bottom: 0;
  }
  
  .music-player .name {
    margin-bottom: 0;
    font-weight: bold;
    font-size: 1.3rem;
  }

  .music-player img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 20px;
    
  }

  .music-player img.active{
    animation: spin 2s linear infinite;
  }

  .block-2 svg {
    margin: 0px 10px !important;
    font-size: 1rem;
  }

  .button {
    border: 2px solid #111;
    border-radius: 50%;
    color: #111;
    background: none;
    /* padding: 8px 15px; */
    width: 50px;
    height: 50px;
    margin: 0px 5px;
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button.active {
    background-color: #003c8f;
    color: #fff;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

</style>