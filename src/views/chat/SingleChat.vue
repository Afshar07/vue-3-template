<template>
  <div class="w-full min-h-full h-full bg-white relative">
    <header
      class="h-14 shadow-md flex items-center justify-between p-4 sticky top-0 right-0 bg-white !z-10"
    >
      <div class="avatar-name-section flex items-center">
        <div class="avatar placeholder online">
          <div class="w-10 rounded-full">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <h2 class="mr-2 font-semibold">کاربر</h2>
      </div>
      <router-link to="/chat">
        <ChevronLeft class="w-5 h-5"></ChevronLeft>
      </router-link>
    </header>
    <main class="h-screen space-y-2 mt-1" dir="ltr">
      <div class="chat chat-start">
        <div class="chat-bubble">What kind of nonsense is this</div>
      </div>
      <div class="chat chat-start">
        <div class="chat-bubble">
          Put me on the Council and not make me a Master!??
        </div>
      </div>
      <div class="chat chat-start">
        <div class="chat-bubble">
          That's never been done in the history of the Jedi. It's insulting!
        </div>
      </div>
      <div class="chat chat-end">
        <div class="chat-bubble">Calm down, Anakin.</div>
      </div>
      <div class="chat chat-end">
        <div class="chat-bubble">You have been given a great honor.</div>
      </div>
      <div class="chat chat-end">
        <div class="chat-bubble">To be on the Council at your age.</div>
      </div>
      <div class="chat chat-end">
        <div class="chat-bubble">It's never happened before.</div>
      </div>
    </main>
    <footer
      class="sticky w-full bottom-0 h-14 shadow border-t p-2 flex items-center bg-white"
    >
      <div class="w-full flex items-center justify-between">
        <!-- Send Button -->
        <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
        <!-- Mic Button -->
        <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        </button>
        <!-- Attachment Button -->
        <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
        </button>
        <input
          type="text"
          placeholder="متن پیام را وارد کنید"
          class="input input-bordered input-sm w-2/3"
        />
      </div>
    </footer>
  </div>
</template>
<script>
import ChevronLeft from "@/components/icons/ChevronLeft.vue";
export default {
  name: "conversation",
  components: { ChevronLeft },
};
</script>
