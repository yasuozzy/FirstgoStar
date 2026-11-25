<template>
  <view class="business-page">
    <view class="top-bar" :class="headerTheme">
      <view class="status-space"></view>
      <view class="nav-row">
        <view class="nav-icon" @click="goBack">
          <u-icon name="arrow-left" size="22" :color="headerIconColor"></u-icon>
        </view>
        <view class="address" @click="mannameClick">
          <text class="address-text">{{ addressText }}</text>
          <u-icon name="arrow-down-fill" size="12" :color="headerIconColor"></u-icon>
        </view>
        <view class="nav-icon" @click="tomyorder">
          <u-icon name="account" size="22" :color="headerIconColor"></u-icon>
        </view>
      </view>
      <view class="search-wrap" @click="searchshop">
        <u-icon name="search" size="18" color="#999999"></u-icon>
        <text class="search-placeholder">搜索店铺</text>
      </view>
    </view>

    <view class="banner-wrap">
      <u-swiper
        v-if="bannerList.length > 0"
        :list="bannerList"
        keyName="advertCode"
        height="229"
        radius="0"
        :autoplay="true"
        :interval="5000"
        :indicator="bannerList.length > 1"
        imgMode="aspectFill"
        @click="handleBannerClick"
      ></u-swiper>
    </view>

    <view class="category-wrap">
      <u-tabs
        :list="categoryTabs"
        :current="activeCategoryIndex"
        :scrollable="true"
        lineColor="#2a9598"
        activeStyle="color: #2a9598; font-weight: 500;"
        inactiveStyle="color: #333333;"
        @click="handleCategoryClick"
      ></u-tabs>
    </view>

    <swiper
      :current="activeCategoryIndex"
      class="category-swiper"
      @change="handleSwiperChange"
    >
      <swiper-item
        v-for="(category, categoryIndex) in categories"
        :key="category.id || category.name"
      >
        <scroll-view
          class="pane-scroll"
          scroll-y
          @scrolltolower="loadMore(categoryIndex)"
        >
          <view class="sort-row">
            <view
              v-for="sort in sortOptions"
              :key="sort.value"
              class="sort-item"
              :class="{ active: getPane(categoryIndex).sortType === sort.value }"
              @click="changeSort(categoryIndex, sort.value)"
            >
              {{ sort.label }}
            </view>
          </view>

          <view class="shop-list">
            <view
              v-for="shop in getPane(categoryIndex).items"
              :key="shop.shopId"
              class="shop-item"
              @click="toshopdetail(shop)"
            >
              <image
                class="shop-cover"
                :src="resolveImage(shop.coverImg) || defaultShopImage"
                mode="aspectFill"
              ></image>
              <view class="shop-main">
                <view class="shop-title">{{ shop.shopName }}</view>
                <view class="score-row">
                  <text
                    v-for="star in starIndexes"
                    :key="star"
                    class="star"
                    :class="{ active: isStarActive(shop.shopScore, star) }"
                  >★</text>
                  <text v-if="shop.shopScore" class="score-text">{{ shop.shopScore }}</text>
                </view>
                <view class="coupon-row">
                  <text
                    v-for="coupon in getCouponTexts(shop.couponList)"
                    :key="coupon"
                    class="coupon-text"
                  >
                    {{ coupon }}
                  </text>
                </view>
              </view>
              <view class="distance-text">{{ shop.distance }}</view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { onMounted } from "vue";
import { onPageScroll, onShow } from "@dcloudio/uni-app";
import {
  MallAppIndexAdvert,
  ServiceShangQuanPaiHangBangList,
  getCategary,
} from "@/api/service";
import { BaseImgURL, storage } from "@/utils/storage";

function resolveImage(img?: string) {
  if (!img) return "";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  return `${BaseImgURL}${img.replace(/^\//, "")}`;
}

type HeaderTheme = "transparent" | "solid";

interface CategoryItem {
  id: string;
  name: string;
}

interface CouponItem {
  couponMoney?: string | number;
}

interface ShopItem {
  coverImg?: string;
  distance?: string;
  shopScore?: string | number;
  shopName?: string;
  shopId?: string;
  couponList?: CouponItem[];
}

interface BannerItem {
  advertCode?: string;
  advertType?: number;
  advertName?: string;
  advertLink?: string;
  activityType?: string;
}

interface PaneState {
  page: number;
  hasMore: boolean;
  loading: boolean;
  sortType: string;
  items: ShopItem[];
}

const HEADER_SWITCH_SCROLL_TOP = 100;
const PAGE_SIZE = 50;
const defaultShopImage = "/static/mine/shopCoverImage.png";
const starIndexes = [1, 2, 3, 4, 5];

const sortOptions = [
  { label: "综合", value: "0" },
  { label: "销量", value: "1" },
  { label: "距离", value: "2" },
  { label: "评价", value: "3" },
];

const categories = ref<CategoryItem[]>([]);
const categoryTabs = computed(() => categories.value.map(item => ({ name: item.name })));
const activeCategoryIndex = ref(0);
const panes = ref<Record<string, PaneState>>({});
const bannerList = ref<BannerItem[]>([]);
const headerTheme = ref<HeaderTheme>("transparent");
const addressText = computed(() => storage.getManname() || "房产地址");
const headerIconColor = computed(() => headerTheme.value === "solid" ? "#ffffff" : "#333333");

const createPane = (): PaneState => ({
  page: 1,
  hasMore: true,
  loading: false,
  sortType: "0",
  items: [],
});

const getPaneKey = (index: number) => categories.value[index]?.id || `all-${index}`;

const getPane = (index: number) => {
  const key = getPaneKey(index);
  if (!panes.value[key]) {
    panes.value[key] = createPane();
  }
  return panes.value[key];
};

const getManageId = () => storage.getManid() || "";

const shouldSendCategoryName = (category: CategoryItem) => !category.name.includes("全部");

const buildShopListParams = (category: CategoryItem, pane: PaneState) => {
  const params: Record<string, string | number> = {
    categaryId: category.id,
    manageId: getManageId(),
    page: pane.page,
    size: PAGE_SIZE,
    turnByType: pane.sortType,
  };

  if (shouldSendCategoryName(category)) {
    params.categaryName = category.name;
  }

  return params;
};
function searchshop(){
	uni.navigateTo({
	  url:"/pages/service/BussinessCircle/BussinessShopSelectShoptPage"
	});
}
const showRouteToast = (name: string) => {
  uni.showToast({
    title: `${name}暂未迁移`,
    icon: "none",
  });
};

const loadAds = () => {
  console.log("===> [loadAds] calling MallAppIndexAdvert with manageId:", getManageId());
  MallAppIndexAdvert({
    manageId: getManageId(),
  }).then((res: any) => {
    console.log("===> [loadAds] res:", res);
    const rawList = Array.isArray(res?.result)
      ? res.result
      : Array.isArray(res?.result?.advertlist)
        ? res.result.advertlist
        : Array.isArray(res?.result?.list)
          ? res.result.list
          : Array.isArray(res?.result?.data)
            ? res.result.data
            : [];
    if (rawList.length > 0) {
      bannerList.value = rawList.map((item: any) => {
        const url = resolveImage(item.advertCode || item.advertUrl || item.advertImg || item.img || item.image || "");
        return {
          ...item,
          advertCode: url,
          image: url,
          url: url,
        };
      });
      console.log("===> [loadAds] bannerList updated:", bannerList.value);
    } else {
      console.log("===> [loadAds] rawList is empty, trying without manageId...");
      MallAppIndexAdvert({}).then((allRes: any) => {
        console.log("===> [loadAds] without manageId res:", allRes);
        const allList = Array.isArray(allRes?.result)
          ? allRes.result
          : Array.isArray(allRes?.result?.advertlist)
            ? allRes.result.advertlist
            : [];
        if (allList.length > 0) {
          bannerList.value = allList.map((item: any) => {
            const url = resolveImage(item.advertCode || item.advertUrl || item.advertImg || item.img || item.image || "");
            return {
              ...item,
              advertCode: url,
              image: url,
              url: url,
            };
          });
        } else {
          bannerList.value = [
            { advertCode: "/static/home/swiper.png", image: "/static/home/swiper.png" },
          ];
        }
      }).catch(() => {
        bannerList.value = [
          { advertCode: "/static/home/swiper.png", image: "/static/home/swiper.png" },
        ];
      });
    }
  }).catch((err: any) => {
    console.log("===> [loadAds] error:", err);
    bannerList.value = [
      { advertCode: "/static/home/swiper.png", image: "/static/home/swiper.png" },
    ];
  });
};

const loadCategories = () => {
  getCategary({
    manageId: storage.getManid(),
  }).then(res => {
    const nextCategories: CategoryItem[] = [
      {
        id: "",
        name: "全部",
      },
    ];

    if (res.resultCode === 200 && Array.isArray(res.result)) {
      res.result.forEach(item => {
        nextCategories.push({
          id: item.ID || "",
          name: item.className || "",
        });
      });
    }

    categories.value = nextCategories;
    activeCategoryIndex.value = 0;
    loadShopList(0, true);
  });
};

const loadShopList = (categoryIndex: number, refresh = false) => {
  const category = categories.value[categoryIndex];
  if (!category) return;

  const pane = getPane(categoryIndex);
  if (pane.loading) return;

  if (refresh) {
    pane.page = 1;
    pane.hasMore = true;
    pane.items = [];
  }

  pane.loading = true;
  ServiceShangQuanPaiHangBangList(buildShopListParams(category, pane))
    .then(res => {
		console.log(res)
      const list = res.resultCode === 200 && Array.isArray(res.result) ? res.result : [];
      pane.hasMore = list.length >= PAGE_SIZE;
      pane.items = refresh ? list : pane.items.concat(list);
    })
    .catch(() => {
      pane.hasMore = false;
    })
    .finally(() => {
      pane.loading = false;
    });
};

const loadMore = (categoryIndex: number) => {
  const pane = getPane(categoryIndex);
  if (!pane.hasMore || pane.loading) return;

  pane.page += 1;
  loadShopList(categoryIndex);
};

const changeSort = (categoryIndex: number, sortType: string) => {
  const pane = getPane(categoryIndex);
  if (pane.sortType === sortType) return;

  pane.sortType = sortType;
  loadShopList(categoryIndex, true);
};

const handleCategoryClick = (item: { index: number }) => {
  activeCategoryIndex.value = item.index;
  loadShopList(item.index, true);
};

const handleSwiperChange = (event: { detail: { current: number } }) => {
  activeCategoryIndex.value = event.detail.current;
  loadShopList(event.detail.current, true);
};

const handleBannerClick = (index: number) => {
  const item = bannerList.value[index];
  if (!item) return;

  if (item.advertType === 0) {
    showRouteToast("网页广告");
    return;
  }

  if (item.activityType === "groupActivity") {
    showRouteToast("团购活动");
  }
};

const getCouponTexts = (couponList?: CouponItem[]) => {
  if (!couponList || couponList.length === 0) {
    return ["暂无优惠券"];
  }

  return couponList.slice(0, 3).map(item => `${item.couponMoney}元券`);
};

const isStarActive = (score: string | number | undefined, star: number) => {
  const value = Number(score || 0);
  return value >= star;
};

onPageScroll(event => {
  headerTheme.value = event.scrollTop >= HEADER_SWITCH_SCROLL_TOP ? "solid" : "transparent";
});

const toshopdetail = (item) => {
    uni.navigateTo({
      url:"/pages/service/BussinessCircle/BussinessShopHomePage?shopId="+item.shopId 
    });
};

const mannameClick = () => {
	  uni.navigateTo({
	    url: "/pages/service/changeMainHouse",
	  });
	};
const tomyorder = () => {
	  uni.navigateTo({
		url: "/pages/service/BussinessCircle/BussinessShopOrder",
	  });
	};
	
const goBack = () => {
			
			uni.navigateBack()
		};
onMounted(() => {
  loadCategories();
  loadAds();
});

onShow(() => {
  loadAds();
});
</script>

<style lang="scss" scoped>
.business-page {
  min-height: 100vh;
  background-color: #ffffff;
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding-bottom: 10px;
  transition: background-color 0.2s ease;

  &.transparent {
    background-color: rgba(255, 255, 255, 0);

    .address-text {
      color: #333333;
    }
  }

  &.solid {
    background-color: #2a9598;

    .address-text {
      color: #ffffff;
    }
  }
}

.status-space {
  height: var(--status-bar-height);
}

.nav-row {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.nav-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.address {
  max-width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.address-text {
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 17px;
}

.search-wrap {
  height: 30px;
  margin: 0 18px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  border-radius: 15px;
  background-color: #ffffff;
}

.search-placeholder {
  margin-left: 6px;
  color: #999999;
  font-size: 12px;
}

.banner-wrap {
  height: 229px;
  background-color: #f5f5f5;
}

.category-wrap {
  background-color: #f1f1f1;
}

.category-swiper {
  height: calc(100vh - 229px - 44px);
  background-color: #ffffff;
}

.pane-scroll {
  height: 100%;
}

.sort-row {
  height: 42px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
}

.sort-item {
  flex: 1;
  text-align: center;
  color: #666666;
  font-size: 14px;

  &.active {
    color: #2a9598;
  }
}

.shop-list {
  background-color: #ffffff;
}

.shop-item {
  min-height: 90px;
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #d9d9d9;
  box-sizing: border-box;
}

.shop-cover {
  width: 85px;
  height: 60px;
  flex: 0 0 85px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background-color: #f5f5f5;
}

.shop-main {
  min-width: 0;
  flex: 1;
  height: 60px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.shop-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333333;
  font-size: 15px;
}

.score-row {
  display: flex;
  align-items: center;
}

.star {
  margin-right: 3px;
  color: #dddddd;
  font-size: 12px;

  &.active {
    color: #ffc600;
  }
}

.score-text {
  margin-left: 12px;
  color: #ffc600;
  font-size: 12px;
}

.coupon-row {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
}

.coupon-text {
  margin-right: 5px;
  color: #2a9598;
  font-size: 11px;
  white-space: nowrap;
}

.distance-text {
  max-width: 70px;
  margin-left: 8px;
  color: #666666;
  font-size: 12px;
}
</style>
