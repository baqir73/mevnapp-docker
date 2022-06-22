<template>
<div>
  <div class='QnA'>
      <div class='question' @click='toggleVisibilty()'>
        <slot></slot>
      </div>
      <div v-if='visible' class='answer'>
        <Answer v-for='answer in question.answers' :key="answer+question._id" class="answer">
             {{ answer }}
        </Answer>
        <div class='ansBox'>
            <input type="text" v-model='newAnswer' placeholder="Answer this questin...">
            <button @click="postAnswer()">Post</button>
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
// const axios = require('axios')
import Answer from './Answer.vue'
export default {
  name: 'Question',
  props: ['question'],
  data: function(){
    return{
        visible: false,
        newAnswer: ''
    }
  },
  methods: {
      toggleVisibilty: function(){
          console.log('Visibility toggled');
          this.visible = !this.visible;
      },
      postAnswer: function(){
        // console.log('Answering to:',  this.question._id)
        // axios.post('http://localhost:3000/query/answer', {
        //   id: this.question._id,
        //   answer: this.newAnswer
        // })
        // .then(response => {
            // console.log('Ans posted: ',response.data);
            this.question.answers.push(this.newAnswer);
            this.newAnswer = ''
        // })
        // .catch(err =>{
        //     console.log('Error:' , err);
        // })

        
      }
  },
  components: {
    Answer
  }
}
</script>

<style>
.question{
    font-size: 20px;
    padding: 5px;
}
.question:hover{
  cursor: pointer;
  background-color: #EEEEEE;
}

.ansBox{
    display: block;
}
.QnA{
    border: 1px solid;
    border-radius: 5px;
}
.answer{
  height: 20px;
}
.answer:hover{
  background-color: #DDDDDD;
  cursor: pointer;
}
</style>
