
<template>

    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <!-- <div v-if="loginFailed" class="alert alert-danger">
                        Email atau Password Anda salah.
                    </div> -->
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>LOGIN</h4>
                        <hr>
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label>Email address</label>
                                <input type="email" v-model="user.email" class="form-control"
                                    placeholder="Email Address">
                            </div>
                            <!-- <div v-if="errorEmail.email" class="mt-2 alert alert-danger">
                                {{ errorEmail.email[0] }}
                            </div> -->

                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" v-model="user.password" class="form-control"
                                    placeholder="Password">
                            </div>
                            <!-- <div v-if="validation.password" class="mt-2 alert alert-danger">
                                {{ validation.password[0] }}
                            </div> -->
                            <button type="submit" @click="login()" class="btn btn-primary btn-block">LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    // import { reactive, ref } from 'vue'
    // import { useRouter } from 'vue-router'
    import axios from 'axios'

    export default {
    data() {
        return{
            user :{
                email: '',
                password: '',
            },
        };
           
    },
      //method login
            methods:{
              login() {
                  let login = {
                    email: this.user.email,
                    password: this.user.password
                  }
                    
                //send server with axios
                axios.post("http://localhost:8000/api/login", login)
                .then(response => {

                   

                    if(response.data.success) {

                        //set token
                        localStorage.setItem('token', response.data.token)

                        //redirect ke halaman dashboard
                        return this.$router.push({
                            name: 'home'
                        })
                    }
                }).catch(err => console .log(err));

            }
        }

    }
</script>