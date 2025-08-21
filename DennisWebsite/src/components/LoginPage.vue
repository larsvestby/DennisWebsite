<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

import GradientText from "./GradientText.vue"

const router = useRouter()

const email = ref("")
const password = ref("")
const loading = ref(false)
const errorMessage = ref("")

const handleLogin = async () => {
    if (!email.value.trim() || !password.value.trim()) {
        errorMessage.value = "Please enter both email and password."
        return
    }

    loading.value = true
    errorMessage.value = ""

    try {
        const response = await fetch("https://localhost:7153/api/Auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            errorMessage.value = errorText || "Login failed."
        } else {
            const data = await response.json()
            console.log("Login success:", data)

            // Save userId in localStorage (for now)
            localStorage.setItem("userId", data.userId)

            // TODO: save JWT instead once implemented
            router.push("/")
        }
    } catch (err) {
        console.error(err)
        errorMessage.value = "An error occurred while logging in."
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="wrapper">
        <div class="login-box">
            <h1>
                <GradientText text="Login" />
            </h1>
            <input v-model="email" type="email" placeholder="Email" class="login-input" />
            <input v-model="password" type="password" placeholder="Password" class="login-input" />
            <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
            <button @click="handleLogin" :disabled="loading">
                <span v-if="!loading">Login</span>
                <span v-else>Loading...</span>
            </button>
            <p class="small-text">
                Don’t have an account? <a @click="router.push('/register')">Register</a>
            </p>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-box {
    background: white;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
    width: 100%;
    max-width: 400px;
    text-align: center;
}

h1 {
    margin-bottom: 1.5rem;
    font-size: 2rem;
    background: linear-gradient(to right, rgb(133, 67, 232), rgb(0, 112, 240), rgb(68, 213, 208));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.login-input {
    width: 100%;
    padding: 1rem;
    margin: 0.75rem 0;
    border: 1px solid #ddd;
    border-radius: 0.75rem;
    font-size: 1rem;
}

button {
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
    border: none;
    border-radius: 0.75rem;
    font-size: 1rem;
    cursor: pointer;
    color: white;
    background: rgb(133, 67, 232);
    opacity: 0.5;
}

Button:hover {
    opacity: 0.8;
}

.error-msg {
    color: red;
    margin-bottom: 1rem;
}

.small-text {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #666;
}

.small-text a {
    color: rgb(132, 83, 232);
    cursor: pointer;
}
</style>
