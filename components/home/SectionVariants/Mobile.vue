<template>
  <div class="mb-3 border border-black bg-[#E0E0E0] w-[250px] mx-auto">
    <nuxt-link :to="`/catalogue/${data.variant}`">
      <div class="flex items-center justify-center mb-2">
        <figure class="relative h-max-200px">
          <nuxt-img
            v-if="!imageError"
            :src="`/mustang/variants/${data.variant
              .replace(' ', '-')
              .replace(' ', '-')}`"
            width="250px"
            height="150px"
            fit="contain"
            format="webp"
            loading="lazy"
            provider="cloudinary"
            :alt="`Mustang variant ${data.variant
              .replace(' ', '-')
              .replace(' ', '-')}`"
            @error="imageError = true"
          />
          <div
            v-else
            class="flex h-[150px] w-[250px] flex-col items-center justify-center gap-1 bg-gray-100 text-gray-400"
          >
            <Icon
              name="material-symbols:image-not-supported-outline"
              size="24px"
            />
            <p class="text-xs normal-case">No image available</p>
          </div>
          <div
            class="absolute bottom-0 left-0 right-0 top-[55%] flex overflow-hidden font-roboto"
          >
            <div
              class="ml-[-50px] flex w-[calc(50%+50px)] skew-x-[31deg] items-center justify-center bg-black text-white"
            >
              <div
                v-if="data.variant.split(' ').length === 1"
                class="w-full skew-x-[-31deg] text-2xl font-bold"
              >
                {{ data.variant }}
              </div>
              <div
                v-else-if="data.variant.split(' ').length === 2"
                class="flex w-full skew-x-[-31deg] flex-col"
              >
                <span class="text-2xl font-bold text-center">
                  {{ data.variant.split(" ")[0] }}
                </span>
                <span class="pl-6 font-bold text-center uppercase">
                  {{ data.variant.split(" ")[1] }}
                </span>
              </div>
              <div v-else class="flex skew-x-[-31deg] flex-col">
                <span class="text-2xl font-bold text-center">{{
                  data.variant.split(" ")[0]
                }}</span>
                <span class="pl-12 font-bold text-center uppercase">
                  {{ data.variant.split(" ")[1] }}
                  {{ data.variant.split(" ")[2] }}
                </span>
              </div>
              <!-- <p class="skew-x-[-31deg] text-2xl font-semibold">
                      {{ variant.variant.split(" ")[1] }}
                    </p> -->
            </div>
            <div
              class="absolute bottom-0 left-[55%] right-[3%] skew-x-[31deg] bg-[#fff101] opacity-90"
            >
              <p class="skew-x-[-31deg]">
                <Icon
                  name="mingcute:arrows-right-line"
                  color="white"
                  size="24px"
                />
              </p>
            </div>
          </div>
        </figure>
      </div>
      <p class="p-1 text-sm font-normal text-start font-open-sans">
        <span class="font-bold">Engine power:</span>
        {{ data.horsePorwer?.join(", ") }}
      </p>
      <!-- <p class="pb-4 text-xl font-semibold font-open-sans">
              Variant: {{ variant.variant }}
            </p> -->
    </nuxt-link>

    <!-- <nuxt-link :to="`/catalogue/${data?.variant}`">
      <nuxt-img
        :src="`/mustang/variants/${data?.variant
          .replace(' ', '-')
          .replace(' ', '-')}`"
        provider="cloudinary"
        sizes="xs:320px sm:400px"
        height="200px"
        fit="fill"
        format="webp"
        :modifiers="{
          gravity: 'auto',
        }"
      />

      <p class="pt-2 text-base font-semibold font-open-sans">
        Variant - {{ data?.variant }}
      </p>
      <p class="p-3 text-sm font-normal text-center font-open-sans">
        <span class="text-sm font-bold text-center">Engine power:</span>
        {{ data?.horsePorwer?.sort().join(", ") }}
      </p>
    </nuxt-link> -->
  </div>
</template>

<script setup>
const props = defineProps(["data"]);

const imageError = ref(false);
</script>
