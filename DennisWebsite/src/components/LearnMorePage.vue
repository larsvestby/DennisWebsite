<script setup>
import { useRouter } from 'vue-router'
import GradientText from './GradientText.vue'
import ScrollBar from './ScrollBar.vue'

const router = useRouter()

const goToChat = () => {
    router.push('/chat')
}

const goToHome = () => {
    router.push('/')
}
</script>

<template>
    <div class="page-root">
        <ScrollBar>
            <div class="learn-wrapper">
                <!-- Hero Section -->
                <section class="hero">
                    <h1>
                        Meet
                        <GradientText text="Dennis AI" />
                    </h1>
                    <p class="subtitle">
                        An <span class="highlight">AI with multiple personalities</span>,
                        making every conversation unique, unpredictable, and fun.
                    </p>
                    <div class="hero-buttons">
                        <button @click="goToChat">Start Chatting</button>
                        <button class="grey" @click="goToHome">Back Home</button>
                    </div>
                </section>
                <!-- Features Section -->
                <section class="features">
                    <h2>
                        <GradientText text="Why Dennis?" />
                    </h2>
                    <div class="feature-grid">
                        <div class="feature-card">
                            <h3>🌀 Multiple Personalities</h3>
                            <p>
                                Dennis responds differently every time — you’ll never know if he’s witty, chaotic,
                                chill, or poetic.
                            </p>
                        </div>
                        <div class="feature-card">
                            <h3>⚡ Real-time Responses</h3>
                            <p>
                                Messages stream live, making conversations flow naturally without awkward pauses.
                            </p>
                        </div>
                        <div class="feature-card">
                            <h3>📚 Persistent Sessions</h3>
                            <p>
                                Dennis remembers your past chats, so you can pick up where you left off anytime.
                            </p>
                        </div>
                    </div>
                </section>
                <!-- How It Works Section -->
                <section class="how-it-works">
                    <h2>
                        <GradientText text="How It Works" />
                    </h2>
                    <div class="tech-explanation">
                        <div class="tech-diagram">
                            <div class="diagram-step">
                                <div class="step-number">1</div>
                                <h3>Your Message Arrives</h3>
                                <p>When you send a message, it's received by our API with your session ID, ensuring
                                    continuity in our conversation.</p>
                            </div>
                            <div class="diagram-arrow">→</div>
                            <div class="diagram-step">
                                <div class="step-number">2</div>
                                <h3>Session Management</h3>
                                <p>Dennis retrieves your chat history or creates a new session with an auto-generated
                                    title.</p>
                            </div>
                            <div class="diagram-arrow">→</div>
                            <div class="diagram-step">
                                <div class="step-number">3</div>
                                <h3>Context Optimization</h3>
                                <p>We prune conversation history to maintain the most relevant context while staying
                                    within memory limits.</p>
                            </div>
                            <div class="diagram-arrow">→</div>
                            <div class="diagram-step">
                                <div class="step-number">4</div>
                                <h3>AI Processing</h3>
                                <p>The Tiger-Gemma-9B model (via LLamaSharp) generates a response token by token.</p>
                            </div>
                            <div class="diagram-arrow">→</div>
                            <div class="diagram-step">
                                <div class="step-number">5</div>
                                <h3>Real-time Streaming</h3>
                                <p>Tokens are streamed to your interface as they’re generated, creating a natural flow.
                                </p>
                            </div>
                            <div class="diagram-arrow">→</div>
                            <div class="diagram-step">
                                <div class="step-number">6</div>
                                <h3>Conversation Preservation</h3>
                                <p>Both user messages and AI responses are stored in the database for later access.</p>
                            </div>
                        </div>
                    </div>
                    <div class="technical-details">
                        <h3>Technical Foundation</h3>
                        <p>
                            Dennis AI is powered by a .NET backend using Entity Framework with SQL Server for
                            persistence.
                            The AI layer is provided by <a href="https://github.com/SciSharp/LLamaSharp" target="_blank"
                                rel="noopener">LLamaSharp</a>
                            and the <a href="https://huggingface.co/pneumix/Tiger-Gemma-9B-v1a-Q8_0.gguf"
                                target="_blank" rel="noopener">Tiger-Gemma-9B model</a>.
                        </p>
                    </div>
                </section>
                <!-- Flow Diagram -->
                <section class="how-it-works">
                    <h2>
                        <GradientText text="End-to-End Flow" />
                    </h2>
                    <div class="tech-diagram">
                        <div class="diagram-step">
                            <div class="step-number">1</div>
                            <h3>Frontend</h3>
                            <p>User sends a message from ChatInput.vue</p>
                        </div>
                        <div class="diagram-arrow">→</div>
                        <div class="diagram-step">
                            <div class="step-number">2</div>
                            <h3>API Request</h3>
                            <p>Message hits ChatController.cs via <code>/api/Chat/stream</code></p>
                        </div>
                        <div class="diagram-arrow">→</div>
                        <div class="diagram-step">
                            <div class="step-number">3</div>
                            <h3>Backend Processing</h3>
                            <p>ChatService.cs fetches session data & streams AI output.</p>
                        </div>
                        <div class="diagram-arrow">→</div>
                        <div class="diagram-step">
                            <div class="step-number">4</div>
                            <h3>AI Engine</h3>
                            <p>LLamaSharp + Tiger-Gemma-9B generate tokens in real time.</p>
                        </div>
                        <div class="diagram-arrow">→</div>
                        <div class="diagram-step">
                            <div class="step-number">5</div>
                            <h3>Streaming Response</h3>
                            <p>Tokens are sent back via SSE to StreamingPreview.vue.</p>
                        </div>
                    </div>
                </section>
                <!-- Frontend Architecture Section -->
                <section class="frontend-architecture">
                    <h2>
                        <GradientText text="Frontend Architecture" />
                    </h2>
                    <div class="frontend-explanation">
                        <p>
                            Dennis AI's frontend is built with Vue 3 and features a responsive, real-time chat interface
                            that integrates seamlessly with our .NET backend.
                        </p>
                        <div class="component-grid">
                            <div class="component-card">
                                <h3>ChatPage.vue</h3>
                                <p>Main chat container that orchestrates all components and manages API communication.
                                </p>
                            </div>
                            <div class="component-card">
                                <h3>ChatBox.vue</h3>
                                <p>Displays conversation history with auto-scrolling to the latest message.</p>
                            </div>
                            <div class="component-card">
                                <h3>ChatMessage.vue</h3>
                                <p>Renders messages with syntax highlighting for code blocks.</p>
                            </div>
                            <div class="component-card">
                                <h3>ChatInput.vue</h3>
                                <p>Handles user input with a gradient border and send button.</p>
                            </div>
                            <div class="component-card">
                                <h3>StreamingPreview.vue</h3>
                                <p>Displays tokens as they stream from the API with smooth animations.</p>
                            </div>
                            <div class="component-card">
                                <h3>SideBar.vue</h3>
                                <p>Manages chat sessions with the ability to switch between conversations.</p>
                            </div>
                        </div>
                        <div class="api-integration">
                            <h3>API Integration</h3>
                            <p>The frontend communicates with Dennis AI backend via REST endpoints:</p>
                            <ul>
                                <li><code>POST /api/Chat/stream</code> - Stream chat responses</li>
                                <li><code>GET /api/Chat/sessions</code> - Retrieve chat history</li>
                                <li><code>GET /api/Chat/messages/{sessionId}</code> - Get messages for a session</li>
                            </ul>
                        </div>
                        <div class="real-time-features">
                            <h3>Real-time Features</h3>
                            <ul>
                                <li>Server-Sent Events (SSE) for token streaming</li>
                                <li>Automatic session management</li>
                                <li>Responsive design (desktop + mobile)</li>
                                <li>Smooth animations for delivery + typing indicators</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <!-- Backend Architecture Section -->
                <section class="frontend-architecture">
                    <h2>
                        <GradientText text="Backend Architecture" />
                    </h2>
                    <div class="frontend-explanation">
                        <p>
                            Dennis AI’s backend is built with ASP.NET Core, handling API communication, session
                            management, database persistence, and AI inference via LLamaSharp.
                        </p>

                        <div class="component-grid">
                            <div class="component-card">
                                <h3>ChatController.cs</h3>
                                <p>Exposes REST endpoints for streaming, sessions, and message history.</p>
                            </div>
                            <div class="component-card">
                                <h3>ChatService.cs</h3>
                                <p>Handles session logic, persistence, and delegates requests to the AI engine.</p>
                            </div>
                            <div class="component-card">
                                <h3>Entity Framework</h3>
                                <p>SQL Server persistence layer for sessions and chat messages.</p>
                            </div>
                            <div class="component-card">
                                <h3>LLamaSharp Executor</h3>
                                <p>Streams tokens from Tiger-Gemma-9B and manages interactive sessions.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- Call To Action -->
                <section class="cta">
                    <h2>
                        Ready to meet
                        <GradientText text="Dennis" />?
                    </h2>
                    <button @click="goToChat">Go to Chat</button>
                </section>
                <span class="tech-stack">
                    Powered by
                    <a href="https://github.com/SciSharp/LLamaSharp" target="_blank" rel="noopener">LLamaSharp</a>
                    with
                    <a href="https://huggingface.co/pneumix/Tiger-Gemma-9B-v1a-Q8_0.gguf" target="_blank"
                        rel="noopener">
                        Tiger-Gemma-9B model
                    </a>
                </span>
            </div>
        </ScrollBar>
    </div>
</template>

<style scoped>
.page-root {
    height: 100vh;
}

.learn-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 2rem 5%;
    color: #222;
    height: 100%;
}

/* Hero Section */
.hero {
    text-align: center;
    margin-top: 2rem;
}

.hero h1 {
    font-size: clamp(3rem, 8vw, 5rem);
    margin-bottom: 1rem;
}

.subtitle {
    font-size: 1.3rem;
    color: #555;
}

.highlight {
    color: rgb(132, 83, 232);
    font-weight: bold;
}

.hero-buttons {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
}

button {
    padding: 1rem 3.5rem;
    background-color: rgb(132, 83, 232);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    opacity: 50%;
}

button:hover {
    opacity: 80%;
}

button.grey {
    background: rgb(137, 133, 150);
}

/* Features Section */
.features {
    text-align: center;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.feature-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    text-align: left;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
    margin-bottom: 0.5rem;
}

/* How It Works */
.how-it-works {
    background: #f7f7f7;
    border-radius: 1rem;
    padding: 2rem;
}

.tech-explanation {
    margin: 2rem 0;
}

.tech-diagram {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 2rem 0;
}

.diagram-step {
    flex: 1;
    min-width: 150px;
    text-align: center;
    padding: 1rem;
    position: relative;
}

.step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgb(132, 83, 232);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-weight: bold;
}

.diagram-arrow {
    flex: 0 0 auto;
    padding: 1rem 0.5rem;
    font-size: 1.5rem;
    color: rgb(132, 83, 232);
    align-self: center;
}

.diagram-step h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #333;
}

.diagram-step p {
    font-size: 0.9rem;
    color: #555;
}

.technical-details {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-top: 2rem;
}

.technical-details h3 {
    margin-bottom: 1rem;
    color: #333;
}

.technical-details a {
    color: rgb(132, 83, 232);
    text-decoration: none;
}

.technical-details a:hover {
    text-decoration: underline;
}

.frontend-architecture {
    background: #f7f7f7;
    border-radius: 1rem;
    padding: 2rem;
    /* margin: 0rem 0; */
}

.frontend-explanation p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.component-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.component-card {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.component-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.component-card h3 {
    color: rgb(132, 83, 232);
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
}

.component-card p {
    font-size: 0.9rem;
    color: #555;
    margin: 0;
}

.api-integration,
.real-time-features {
    background: white;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin: 1.5rem 0;
}

.api-integration h3,
.real-time-features h3 {
    color: #333;
    margin-bottom: 1rem;
}

.api-integration ul,
.real-time-features ul {
    padding-left: 1.5rem;
}

.api-integration li,
.real-time-features li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
}

.api-integration code {
    background: #f3f3f3;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
    color: #d63384;
}

/* CTA */
.cta {
    text-align: center;
    margin-bottom: 4rem;
}

.cta h2 {
    margin-bottom: 1.5rem;
}

/* Tech Stack */
.tech-stack {
    font-size: 0.9rem;
    color: #555;
}

.tech-stack a {
    color: rgb(132, 83, 232);
    text-decoration: none;
    margin: 0 0.25rem;
}

.tech-stack a:hover {
    text-decoration: underline;
}
</style>