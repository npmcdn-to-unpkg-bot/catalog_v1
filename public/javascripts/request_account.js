new Vue({
  el: '#request_account_fields',
  //refactor later to use a template
  data:{
    account_request: {
      user_name:'',
      user_email: '',
      referral_source: '...',
      email_signup: false
    },
    message_to_user: null
  },

  methods:{
    sendData: function(){
      //console.log("send button pressed");

      this.$http.post('/request-account', this.account_request).then((response) => {
          console.log(response.json().status);
          this.your_name= response.json().name;
        }, (response) => {
          // error callback
          console.log("was not able to send data");
      });
    }
  },
  computed: {
    activeButton: function(){
      if((this.account_request.user_name.length>1)&&(this.account_request.user_email.length>1))
      {
        return false;
      }
      else{
        return true;
      }
    }
  }

})
