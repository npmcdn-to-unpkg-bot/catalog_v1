// Register email validator function.
Vue.validator('user_email', function (val) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
})

new Vue({
  el: '#request_account_fields',
  //refactor later to use a template
  data:{
    account_request: {
      user_name:'',
      user_email: '',
      referral_source: null,
      email_signup: false
    },
    failed_user_signup: false,
  },

  methods:{
    sendData: function(){
      //console.log("send button pressed");
      if(this.account_request.referral_source===null){
        this.account_request.referral_source='none';
      };

      this.$http.post('/request-account', this.account_request).then((response) => {
          //console.log(response.json().status);
          window.location.href= response.json().redirect_to;
        }, (response) => {
          // error callback
          this.failed_user_signup=true;
          //console.log(response.json().status);
          window.location.href= response.json().redirect_to;
      });
    }
  },
  computed: {
    activeButton: function(){
      if((this.account_request.user_name.length>1)&&(this.account_request.user_email.length>1)&&(!this.$validation1.address.user_email))
      {
        return false;
      }
      else{
        return true;
      }
    },
    trackEmailValue: function(){
      if(this.$validation1.address){
        return !this.$validation1.address.user_email;
      }
      else {
        return false;
      }
    },
    trackNameValue: function(){
      if(this.$validation1.username){
        return this.$validation1.username.valid;
      }
      else {
        return true;
      }
    }
  }

})
