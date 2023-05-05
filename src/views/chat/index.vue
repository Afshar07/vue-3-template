<template>
  <div class="main-card w-full">
    <header>
      <h1>گفتگو های من</h1>
    </header>
    <main>
      <div class="stats stats-vertical !w-full shadow-md mt-3">
        <ConversationCard :avatar="false" :online="true"></ConversationCard>
        <ConversationCard :avatar="false"></ConversationCard>
        <ConversationCard></ConversationCard>
        <ConversationCard :online="true"></ConversationCard>
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
