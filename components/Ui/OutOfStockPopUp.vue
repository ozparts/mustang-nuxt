<template>
  <dialog id="outOfStockModal" class="daisy-modal z-40">
    <div class="daisy-modal-box">
      <h3 class="w-full text-center font-nunito text-lg">Out of stock!</h3>
      <p class="text-wrap-balance mt-4 text-center font-nunito">
        Order cannot be completed! The requested quantity exceeds our current
        inventory. Please adjust your order accordingly.
      </p>
      <div class="daisy-modal-action">
        <form method="dialog" class="w-full text-center">
          <button
            class="daisy-btn bg-mustangRed text-white hover:border-mustangRed hover:bg-white hover:text-mustangRed"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
