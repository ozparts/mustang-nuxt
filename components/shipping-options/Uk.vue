<template>
  <div class="flex flex-col my-2 text-sm sm:text-base">
    <p class="mb-3">
      Given number of days does not include the day of the dispatch.
    </p>
    <p class="mb-5">We use following companies to deliver your goods:</p>
    <p class="mb-3 font-bold">11.1 Deliveries across UK</p>
    <div class="mb-5 mr-auto overflow-x-auto bg-[#F7F7F7]">
      <table
        class="border border-black daisy-table daisy-table-zebra daisy-table-xs sm:daisy-table-md lg:daisy-table-lg"
      >
        <thead class="text-center text-black bg-white sm:text-base">
          <tr class="border-b border-black">
            <th>Company</th>
            <th class="break-words whitespace-normal">
              UPS Estimated lead time (working days)
            </th>
          </tr>
        </thead>

        <tbody class="text-center text-black">
          <tr>
            <td>UPS Standard service</td>
            <td>1-2 days</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="mb-3 font-bold">11.2 Deliveries from EU warehouse to UK</p>

    <div class="mr-auto mb-5 overflow-x-auto bg-[#F7F7F7]">
      <table
        class="border border-black daisy-table daisy-table-zebra daisy-table-xs sm:daisy-table-md lg:daisy-table-lg"
      >
        <thead class="text-xs text-center text-black bg-white sm:text-base">
          <tr class="border-b border-black">
            <th>Company</th>
            <th class="break-words whitespace-normal">
              Estimated lead time (working days)
            </th>
          </tr>
        </thead>

        <tbody class="text-center text-black">
          <tr>
            <td>Raben</td>
            <td>Approx 2-3 weeks*</td>
          </tr>
          <tr>
            <td>Raben</td>
            <td>Approx 2-3 weeks*</td>
          </tr>
        </tbody>
      </table>
      <small class="font-bold">
        *Those deliveries are arranged every Monday, Wednesday, Friday.
      </small>
    </div>
  </div>
</template>
