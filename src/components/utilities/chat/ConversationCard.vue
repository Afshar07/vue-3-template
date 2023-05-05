<template>
  <div
    class="w-full flex items-center flex-row-reverse justify-between p-4 focus:bg-primary/30 transition-colors"
    tabindex="0"
  >
    <div class="stat-figure text-secondary">
      <div
        class="avatar placeholder"
        :class="props.online ? 'online' : 'offline'"
      >
        <div v-if="props.avatar" class="w-14 rounded-full">
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
        <div
          v-else
          class="bg-neutral-focus text-neutral-content rounded-full w-12"
        >
          <span class="text-3xl">K</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-start justify-between h-full">
      <p class="font-semibold">کاربر شماره یک</p>
      <p class="text-sm text-gray-700 w-[10rem] max-w-[10rem] truncate">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با
        نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
        خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
        داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان
        رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
        پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
      </p>
    </div>
    <!-- <div class="stat-title text-gray-900 mb-1">کاربر شماره یک</div>
    <div class="stat-desc text-gray-800">آخرین پیام گفتگو</div> -->
  </div>
</template>
<script setup>
const props = defineProps({
  avatar: {
    type: Boolean,
    default: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});
</script>
