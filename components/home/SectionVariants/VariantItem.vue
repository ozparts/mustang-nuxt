<!-- <template>
  <div class="my-3 border border-black">
    <nuxt-link :to="`/catalogue/${data?.variant}`">
      <div
        class="mb-2 flex h-[200px] items-center justify-center overflow-hidden"
      >
        <nuxt-img
          src="/mustang/white_mustang_cogadb.jpg"
          alt=""
          provider="cloudinary"
        />
      </div>
      <p class="pb-2 text-2xl font-semibold">Variant - {{ data?.variant }}</p>
      <p class="p-3 text-center text-[14px] font-normal">
        <span class="text-center text-[14px] font-bold">Engine power:</span>
        {{ data?.horsePorwer?.sort().join(", ") }}
      </p>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { Variant } from "utils/utils";

const props = defineProps({
  data: Object as () => Variant,
});
</script> -->
