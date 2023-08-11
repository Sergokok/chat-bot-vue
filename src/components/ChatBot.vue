<!--<template>-->
<!--  <div class="chat-bot">-->
<!--    <div class="chat-widget">-->
<!--      <div class="chat-messages">-->
<!--        <div-->
<!--            v-for="(message, index) in messages"-->
<!--            :key="index"-->
<!--            class="chat-message"-->
<!--            :class="{ 'user-message': message.fromUser, 'bot-message': !message.fromUser }"-->
<!--        >-->
<!--          {{ message.content }}-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="user-input">-->
<!--        <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type your message...">-->
<!--        <button @click="sendMessage">Send</button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      userInput: '',-->
<!--      messages: [],-->
<!--      awaitingUserResponse: true, // Бот ожидает ответа пользователя-->
<!--      options: [-->
<!--        'Заказать пиццу',-->
<!--        'Установить будильник',-->
<!--        'Вывести погоду',-->
<!--      ],-->
<!--    };-->
<!--  },-->
<!--  created() {-->
<!--    this.messages.push({-->
<!--      content: 'Привет! Что я могу для Вас сделать?',-->
<!--    });-->
<!--    this.options.forEach(option => {-->
<!--      this.messages.push({ content: option, fromUser: false });-->
<!--    });-->
<!--  },-->
<!--  methods: {-->
<!--    sendMessage() {-->
<!--      if (this.userInput.trim() !== '') {-->
<!--        this.messages.push({ content: this.userInput, fromUser: true });-->
<!--        if (this.awaitingUserResponse) {-->
<!--          this.handleUserResponse();-->
<!--        }-->
<!--        this.userInput = '';-->
<!--      }-->
<!--    },-->
<!--    handleUserResponse() {-->
<!--      const response = `Хорошо, я ${this.userInput.toLowerCase()}. Что еще могу сделать?`;-->
<!--      this.messages.push({ content: response, fromUser: false });-->
<!--      this.options.forEach(option => {-->
<!--        this.messages.push({ content: option, fromUser: false });-->
<!--      });-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<template>
  <div class="chat-bot">
    <div class="chat-widget">
      <div class="chat-messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="chat-message"
          :class="{ 'user-message': message.fromUser, 'bot-message': !message.fromUser }"
          @click="handleMessageClick(message)"
        >
          {{ message.content }}
        </div>
      </div>
      <div class="user-input">
        <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Введите ваше сообщение...">
        <button v-if="showBackToStartButton" @click="resetConversation">Вернуться к началу беседы</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: '',
      messages: [],
      awaitingUserResponse: true,
      showBackToStartButton: false,
      options: [
        { question: 'Заказать пиццу', response: 'Хорошо, я закажу пиццу. Какую именно пиццу?' },
        { question: 'Установить будильник', response: 'Хорошо, я установлю для Вас будильник. На какое время его установить?' },
        { question: 'Вывести погоду', response: 'Сегодня в нашей местности солнечно, температура +22. Что еще я могу для вас сделать?' },
      ],
    };
  },
  created() {
    setTimeout(() => {
      this.messages.push({ content: 'Вас приветствует Чат-бот сайта!', fromUser: false });
      this.messages.push({ content: 'Привет! Что я могу для Вас сделать?', fromUser: false });
      this.options.forEach(option => {
        this.messages.push({ content: option.question, fromUser: false });
      });
    }, 1000);
  },
  methods: {
    sendMessage() {
      if (this.userInput.trim() !== '') {
        this.messages.push({ content: this.userInput, fromUser: true });
        if (this.awaitingUserResponse) {
          this.handleUserResponse();
        }
        this.userInput = '';
      }
    },
    handleUserResponse() {
      const selectedOption = this.options.find(option => option.question === this.userInput);
      if (selectedOption) {
        this.messages.push({ content: selectedOption.response, fromUser: false });
        this.options = [];
        this.showBackToStartButton = true;
      } else {
        this.messages.push({ content: 'Извините, я не могу понять эту команду. Что еще я могу для вас сделать?', fromUser: false });
      }
    },
    handleMessageClick(message) {
      if (!message.fromUser && this.awaitingUserResponse) {
        this.userInput = message.content;
        this.sendMessage();
      }
    },
    resetConversation() {
      this.messages = [];
      this.awaitingUserResponse = true;
      this.options = [
        { question: 'Заказать пиццу', response: 'Хорошо, я закажу пиццу. Какую именно пиццу?' },
        { question: 'Установить будильник', response: 'Хорошо, я установлю для Вас будильник. На какое время его установить?' },
        { question: 'Вывести погоду', response: 'Сегодня в нашей местности солнечно, температура +22. Что еще я могу для вас сделать?' },
      ];
      this.showBackToStartButton = false;
      this.created();
    },
  },
};
</script>

<style scoped>
/* Your styles remain the same */
</style>

