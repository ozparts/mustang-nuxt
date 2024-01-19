<template>
  <div
    class="w-full fixed z-[44] min-h-screen bg-[#22262af2] m-auto pb-[30px] right-0 top-0 pl-3 pr-0 md:!px-6 pt-4 md:!pt-8"
  >
    <div class="lg:w-[700px] m-auto mt-4">
      <v-form @submit.prevent class="flex flex-wrap items-center">
        <v-text-field
          v-model="state.search"
          type="text"
          block
          density="comfortable"
          variant="solo"
          hide-details
          @click:clear="onClear"
          clearable
          @keyup.enter.prevent="search"
          ><v-field-label>type to search...</v-field-label></v-text-field
        >
        <v-btn variant="text" @click="close">
          <Icon
            name="material-symbols:close-rounded"
            color="white"
            size="30px"
          ></Icon>
        </v-btn>
      </v-form>
      <Loader :loader="state.loader"></Loader>
      <p
        v-if="state.noresult && !state.result"
        class="mt-4 text-white font-nunito-sans"
      >
        Sorry, but nothing matched your search terms.<br />
        Please try again with some different keywords.
      </p>
      <div
        class="pb-4 bg-[rgba(0,0,0,0.719)] ml-0 mr-16 mt-2.5 mb-0 rounded-[3px] flex flex-col items-center"
        v-if="state.result"
      >
        <div class="flex flex-col p-2 text-white card font-nunito">
          <NuxtLink
            v-for="item in state.showResuls"
            :to="`/product/${item.number}`"
            class="flex items-center p-2 mt-2 text-white"
            @click="$emit('close')"
          >
            <div class="flex items-center gap-2">
              <img
                v-if="item.photos[0]"
                :src="item.photos[0].url"
                :alt="item.photos[0].name"
                class="w-[60px] h-[60px] object-contain bg-white"
              />
              <nuxt-img
                v-else
                src="/mustang/no-image_k6aigy.jpg"
                provider="cloudinary"
                width="60px"
                height="60px"
                fit="contain"
                background="white"
              />
              <div class="flex gap-1">
                <h5>{{ item.description }}</h5>
              </div>
            </div>
          </NuxtLink>
        </div>
        <hr class="mb-8 h-[3px] max-w-[400px] m-4 w-[90%]" />
        <NuxtLink
          class="text-white uppercase"
          :to="`/search/${state.search}`"
          @click="$emit('close')"
          ><h5 class="flex items-center text-center daisy-btn">
            view all results
            <span class="pl-2">{{ state.result.length }}</span>
          </h5>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";

const emit = defineEmits(["close"]);

const initialState = {
  search: "",
  result: "",
  showResuls: "",
  noresult: false,
  loader: false,
};

const state = reactive({
  ...initialState,
});

const v$ = useVuelidate(state);

const close = () => {
  state.result = "";
  state.search = "";
  emit("close");
};

const onClear = () => {
  v$.value.$reset();
  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
};

const search = async () => {
  if (state.search !== "") {
    state.loader = true;
    const data = await useSearch(state.search);
    if (data.length) {
      state.result = data;
      state.showResuls = data.slice(0, 5);
      state.loader = false;
    } else {
      state.noresult = true;
      state.loader = false;
    }
  }
};
</script>
