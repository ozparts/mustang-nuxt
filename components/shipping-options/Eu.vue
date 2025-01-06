<template>
  <div class="flex flex-col my-2">
    <h4 class="mb-4 text-sm sm:text-base">
      1. UPS Standard - Orders placed and paid on-line till 1:00 pm are being
      processed the same day
    </h4>
    <div>
      <NuxtImg
        src="https://ozparts.eu/img/UPS.4a811a50.png"
        alt="The transit times reflect UPS"
        width="700px"
      />
    </div>

    <p class="p-2 mb-5 text-sm">
      *Image source: www.ups.com. The transit times reflect UPS' regular
      delivery schedule, but are not guaranteed
    </p>

    <div class="mb-5 mr-auto overflow-x-auto bg-[#F7F7F7]">
      <table
        class="border border-black daisy-table daisy-table-zebra daisy-table-xs sm:daisy-table-md lg:daisy-table-lg"
      >
        <thead class="text-xs text-center text-black bg-white sm:text-base">
          <tr class="border-b border-black">
            <th>Country</th>
            <th>UPS Estimate lead time**</th>
          </tr>
        </thead>

        <tbody class="text-center text-black">
          <tr>
            <td>Germany, Czech Republic, Slovakia</td>
            <td>2 days</td>
          </tr>
          <tr>
            <td>France, Belgium, Denmark, Netherlands, Austria, Switzerland</td>
            <td>3 days</td>
          </tr>
          <tr>
            <td>United Kingdom, Spain, Italy, Slovenia, Hungary, Romania</td>
            <td>4 days</td>
          </tr>
          <tr>
            <td>
              Portugal, Greece, Croatia, Lithuania, Latvia, Estonia, Norway
            </td>
            <td>5 days</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="mb-5 text-sm sm:text-base">
      2. UPS Express (1-2 days over continental Europe). Orders placed and paid
      online till 1:00 pm are being processed the same day
    </h4>

    <h4 class="mb-4 text-sm sm:text-base">3. DPD</h4>

    <div class="mr-auto mb-5 overflow-x-auto bg-[#F7F7F7]">
      <table
        class="border border-black daisy-table daisy-table-zebra daisy-table-xs sm:daisy-table-md lg:daisy-table-lg"
      >
        <thead class="text-xs text-center text-black bg-white sm:text-base">
          <tr class="border-b border-black">
            <th>Country</th>
            <th>DPD Estimate lead time**</th>
          </tr>
        </thead>

        <tbody class="text-center text-black">
          <tr>
            <td>Poland</td>
            <td>1 day</td>
          </tr>
          <tr>
            <td>Belgium, Czech Republic, Germany, Netherlands</td>
            <td>3 days</td>
          </tr>
          <tr>
            <td>France, Romania, Sweden</td>
            <td>4 days</td>
          </tr>
          <tr>
            <td>Bulgaria, Finland, Italy, Portugal, Spain</td>
            <td>5 days</td>
          </tr>
          <tr>
            <td>Greece</td>
            <td>6 days</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="mb-4 text-sm font-bold sm:text-base">
      <p>*Given number of days does not include the day of the dispatch.</p>
      <p>**Working days</p>
    </h4>
  </div>
</template>
