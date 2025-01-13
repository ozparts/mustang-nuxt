<template>
  <div class="flex flex-col my-2 text-sm sm:text-base">
    <h4 class="mb-3 font-bold">
      Orders placed and paid online till 1:00 pm are being processed the same
      day.
    </h4>
    <p class="mb-3">
      Given number of days does not include the day of the dispatch.
    </p>
    <p class="mb-5">
      The transit times reflect UPS' regular delivery schedule, but are not
      guaranteed.
    </p>
    <p class="mb-3 font-bold">UPS Standard</p>
    <div class="mb-5 mr-auto overflow-x-auto bg-[#F7F7F7]">
      <table
        class="border border-black daisy-table daisy-table-zebra daisy-table-xs sm:daisy-table-md lg:daisy-table-lg"
      >
        <thead class="text-center text-black bg-white sm:text-base">
          <tr class="border-b border-black">
            <th>Country</th>
            <th class="break-words whitespace-normal">
              UPS Standard - Estimated lead time (working days)
            </th>
          </tr>
        </thead>

        <tbody class="text-center text-black">
          <tr>
            <td>Belgium, Netherlands</td>
            <td>1 day</td>
          </tr>
          <tr>
            <td>
              Austria, Denmark, France, Germany, Italy, Luxembourg, Norway,
              Poland, Slovenia, United Kingdom
            </td>
            <td>2 days</td>
          </tr>
          <tr>
            <td>Czech Republic, Hungary, Slovakia, Spain, Switzerland</td>
            <td>3 days</td>
          </tr>
          <tr>
            <td>Croatia, Lithuania, Portugal, Romania</td>
            <td>4 days</td>
          </tr>
          <tr>
            <td>Estonia, Finland, Latvia, Sweden</td>
            <td>5 days</td>
          </tr>
          <tr>
            <td>Bulgaria, Greece</td>
            <td>6 days</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="mb-3 font-bold">UPS Express</p>

    <div class="mr-auto mb-5 overflow-x-auto bg-[#F7F7F7]">
      <table
        class="border border-black daisy-table daisy-table-zebra daisy-table-xs sm:daisy-table-md lg:daisy-table-lg"
      >
        <thead class="text-xs text-center text-black bg-white sm:text-base">
          <tr class="border-b border-black">
            <th>Country</th>
            <th class="break-words whitespace-normal">
              UPS Express - Estimated lead time (working days)
            </th>
          </tr>
        </thead>

        <tbody class="text-center text-black">
          <tr>
            <td>
              Austria, Belgium, Czech Republic, Denmark, France, Germany, Italy,
              Luxembourg, Netherlands, Poland, Portugal, Slovenia, Spain,
              Switzerland, United Kingdom
            </td>
            <td>1 day</td>
          </tr>
          <tr>
            <td>
              Estonia, Hungary, Latvia, Lithuania, Norway, Romania, Slovakia,
              Sweden
            </td>
            <td>2 days</td>
          </tr>
          <tr>
            <td>Bulgaria, Croatia</td>
            <td>3 days</td>
          </tr>
          <tr>
            <td>Finland, Greece</td>
            <td>4 days</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
