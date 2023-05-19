<template>
  <div class="w-full  my-1">
    <section
        ref="dropDown"
      class="flex items-center  justify-between rounded-xl px-3.5 py-2 cursor-pointer dark:text-white dark:fill-white gap-2 hover:fill-white hover:!bg-primary hover:text-white text-md font-medium"
      @click="toggleIsOpen"
    >
      <h4 class="text-lg z-10 col-start-1 col-end-5">
        <slot name="title"></slot>
      </h4>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 my-2 arrow z-10 mr-2 col-start-6 col-end-7 md:col-start-7"
        :class="arrowDirection"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </section>

    <transition name="slide" mode="out-in">
      <section
        v-show="isOpen"
        :class="paddingX"
        class="rounded-b-md main-section"
      >
        <div class="  ">
          <slot name="content"></slot>
        </div>
      </section>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    paddingX: {
      type: String,
      required: false,
      default: "px-1",
    },
  },
  name: "Dropdown",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleIsOpen() {
      this.isOpen = !this.isOpen;

    },
  },
  computed: {
    arrowDirection() {
      if (this.isOpen) {
        return "arrowUp";
      }
    },
    headerBackgroundColor() {
      if (this.isOpen) {
        return "faq-header-active";
      }
    },
  },
};
</script>

<style scoped>
.arrow {
  transition: all 0.2s !important;
}

.arrowUp {
  transform: rotate(180deg) !important;
}

.slide-enter-active {
  animation: slide-down 2s ease-out;
  overflow: hidden;
}

.slide-leave-active {
  animation: slide-up 0.3s ease-out;
  overflow: hidden;
}

@keyframes slide-down {
  0% {
    display: hidden;
    max-height: 0px;
  }
  100% {
    display: block;
    max-height: 400px;
  }
}

@keyframes slide-up {
  0% {
    display: block;
    max-height: 100px;
  }
  100% {
    display: hidden;
    max-height: 0px;
  }
}
</style>
