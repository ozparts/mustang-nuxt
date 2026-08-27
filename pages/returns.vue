<template>
  <Head>
    <Title> Returns | Mustang Performance </Title>
    <Meta name="description" content="Returns" />
  </Head>
  <Banner title="Returns" />

  <section
    class="container text-sm sm:text-base mx-auto px-4 py-5 sm:py-10 sm:px-0 font-nunito sm:max-w-[540px] md:max-w-[720px] lg:max-w-[980px] xl:max-w-[1140px] 2xl:max-w-[1440px]"
  >
    <h3 class="mt-3 mb-1 text-sm font-bold sm:text-lg">Returns - conditions</h3>
    <p class="mb-3 text-sm sm:text-base">
      If you are not satisfied with your purchase, please follow the
      instructions below to return the product:
    </p>
    <ol class="returns-list">
      <li>
        <strong>Return period</strong> – returns are accepted within 30 days
        from the date of the final invoice.
      </li>
      <li>
        <strong>Product condition</strong> – all returned items must be in their
        original condition, factory-sealed (no signs of opening), and include
        all original manufacturer's packaging and/or tags.
      </li>
      <li>
        <strong>Return registration</strong> – before sending the return
        shipment, the return must be registered
        <a
          href="https://dba4x4.home.pl/returns/?source=mustangperformanceeu"
          target="_blank"
          title="Return form to download"
          ><span class="border-b border-black gtm_btn_returns">[HERE]</span></a
        >.
      </li>
      <li>
        <strong>Return form</strong> – the return package must include a
        completed and printed return form that includes under the link above.
      </li>
      <li>
        <strong>Return shipping deadline</strong> – the return shipment must be
        dispatched within a maximum of 7 days from the date the return was
        registered online.
      </li>
      <li>
        <strong>Return shipping costs</strong> – return shipping costs are
        covered by the customer.
      </li>
      <li>
        <strong>Cash on delivery</strong> – we do not accept returns sent via
        cash on delivery (COD).
      </li>
      <li>
        <strong>Packaging responsibility</strong> – the customer is responsible
        for packing the returned items securely. We do not accept items damaged
        during transport organized by the customer.
      </li>
      <li>
        <strong>Return of "kits"</strong> – in the case of product sets
        consisting of multiple parts, we only accept returns of the entire set.
        Partial returns of individual components will not be accepted.
      </li>
      <li>
        <strong>Credit note</strong> – will be issued within 5 business days
        from the receipt of the returned goods at our warehouse.
      </li>
      <li>
        <strong>Refund method</strong> – the refund will be issued using the
        same payment method as used for the original order.
      </li>
    </ol>
    <WithdrawFromContract />
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
.returns-list {
  list-style: decimal;
  margin-left: 30px;
  margin-bottom: 20px;
  li {
    margin: 10px 0;
    .gtm_btn_returns {
      color: red;
      font-weight: 600;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
