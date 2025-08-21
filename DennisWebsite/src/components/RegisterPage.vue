<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

import GradientText from "./GradientText.vue"

const router = useRouter()

const firstName = ref("")
const lastName = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const loading = ref(false)
const errorMessage = ref("")

const handleRegister = async () => {
    if (!firstName.value.trim() || !lastName.value.trim() || !email.value.trim() || !password.value.trim()) {
        errorMessage.value = "Please fill in all fields."
        return
    }
    if (password.value !== confirmPassword.value) {
        errorMessage.value = "Passwords do not match."
        return
    }

    loading.value = true
    errorMessage.value = ""

    try {
        const response = await fetch("https://localhost:7153/api/Auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            errorMessage.value = errorText || "Registration failed."
        } else {
            const data = await response.json()
            console.log("Register success:", data)
            errorMessage.value = ""
            router.push("/login") // go to login after success
        }
    } catch (err) {
        console.error(err)
        errorMessage.value = "An error occurred while registering."
    } finally {
        loading.value = false
    }
}

const goToLogin = () => {
    router.push("/login")
}
</script>

<template>
    <div class="wrapper">
        <div class="register-box">
            <h1>
                <GradientText text="Register" />
            </h1>
            <div class="row-grid">
                <input v-model="firstName" type="first-name" placeholder="First name" class="register-input" />
                <input v-model="lastName" type="last-name" placeholder="Last name" class="register-input" />
            </div>
            <input v-model="email" type="email" placeholder="Email" class="register-input" />
            <input v-model="password" type="password" placeholder="Password" class="register-input" />
            <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="register-input" />
            <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
            <div class="row-grid">
                <button @click="handleRegister" :disabled="loading">
                    <span v-if="!loading">Register</span>
                    <span v-else>Loading...</span>
                </button>
                <button class="grey" @click="goToLogin">Back</button>
            </div>
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

.row-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.register-box {
    background: white;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
    width: 100%;
    max-width: 50%;
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

.register-input {
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

Button.grey {
    background-color: rgb(137, 133, 150);
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
