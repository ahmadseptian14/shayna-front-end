<template>
    <!-- Partner Logo Section Begin -->
    <div class="partner-logo">
        <div class="container">
            <carousel class="logo-carousel" :items="5" :loop="true" :autoplay="true" :dots="false" :nav="false">
                <div class="logo-item mr-2">
                    <div class="tablecell-inner">
                        <img src="img/logo-carousel/3second-logo.png" alt="" />
                    </div>
                </div>
                <div class="logo-item mr-2">
                    <div class="tablecell-inner">
                        <img src="img/logo-carousel/blnrs-logo.png" alt="" />
                    </div>
                </div>
                <div class="logo-item mr-2">
                    <div class="tablecell-inner">
                        <img src="img/logo-carousel/moutley_logo.jfif" alt="" />
                    </div>
                </div>
                <div class="logo-item mr-2">
                    <div class="tablecell-inner">
                        <img src="img/logo-carousel/uniqlo_logo.png" alt="" />
                    </div>
                </div>
                <div class="logo-item mr-2">
                    <div class="tablecell-inner">
                        <img src="img/logo-carousel/HM.png" alt="" />
                    </div>
                </div>
            </carousel>
        </div>
    </div>
    <!-- Partner Logo Section End -->
</template>

<script>
import carousel from 'vue-owl-carousel';

export default {
    name: "PartnerShayna",
    components:{
        carousel
    }
}
</script>