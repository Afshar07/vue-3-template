<template>
  <div class="main-card w-full">
    <header>
      <h1>گفتگو های من</h1>
    </header>
    <main>
      <div class="stats stats-vertical !w-full shadow-md mt-3">
        <router-link to="/chat/username">
          <ConversationCard :avatar="false" :online="true"></ConversationCard>
        </router-link>
        <router-link to="/chat/username">
          <ConversationCard :avatar="false"></ConversationCard>
        </router-link>
        <router-link to="/chat/username">
          <ConversationCard></ConversationCard>
        </router-link>
        <router-link to="/chat/username">
          <ConversationCard :online="true"></ConversationCard>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
import ConversationCard from "@/components/utilities/chat/ConversationCard.vue";
export default {
  name: "index",
  components: { ConversationCard },
};
</script>

<style scoped></style>
