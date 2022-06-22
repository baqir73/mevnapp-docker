<template>

  <div id="app">
    <div>
      <div>
        <h1 class='postQuery'>AskAnon</h1>
        <input v-model='newQuery' type="text" placeholder="Type the query...">
        <button @click='postQuery()'>Post Query</button>
      </div>

      <div>
        <Question v-for='question in questions' v-bind:key="question+question._id " v-bind:question.sync='question'>
            {{ question.question }}
        </Question>
      </div>
  </div>
  </div>

</template>

<script>
const axios = require('axios')
import Question from './components/Question.vue'

export default {
  name: 'App',
  data: function(){
    return {
        questions: [
          // {
          //   question: 'Is this a question?',
          //   answers: [
          //     'This is a Dummy Answer',
          //     'This is a Dummy Answer 2',
          //     'This is a Dummy Answer 3',
          //     'This is a Dummy Answer 4',
          //     'This is a Dummy Answer 5',
          //     ]
          // },
          // {
          //   question: 'Is this a question 2?',
          //   answers: [
          //     'This is a Dummy Answer 21',
          //     'This is a Dummy Answer 22',
          //     'This is a Dummy Answer 23',
          //     'This is a Dummy Answer 24',
          //     'This is a Dummy Answer 25',
          //     ]
          // }
        ],
        newQuery: '',
    }
  },
  methods: {
    getAllQueries: function () {
      axios.get('http://localhost:3000/query/get')
      .then(response => {
          console.log(response.data);
          this.questions = [];
          this.questions = response.data;
          console.log(this.questions);
      })
      .catch(err =>{
          console.log('Error:' , err);
      })
    },
    postQuery: function(){
      // this.questions.push(
      //   {
      //     question: this.newQuery,
      //     answers: []
        // }
      axios.get('http://localhost:3000/query/get')
      .then(response => {
          console.log(response.data);
          this.questions = [];
          this.questions = response.data;
          console.log(this.questions);
      })
      .catch(err =>{
          console.log('Error:' , err);
      })
      // )
      axios.post('http://localhost:3000/query/add', {
        question: this.newQuery
      })
      .then(response => {
          console.log(response.data);
      })
      .catch(err =>{
          console.log('Error:' , err);
      })
      this.newQuery = '';
      this.questions = [];
      this.getAllQueries();
    },
  },
  created() {
    this.getAllQueries();
  },
  components: {
    Question
  }
}
</script>

<style>
.postQuery{
  display: inline;
  padding-right: 100px;
}
</style>
