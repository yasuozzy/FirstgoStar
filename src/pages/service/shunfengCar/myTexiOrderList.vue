<template>
    <view class="main">
        <u-navbar
          title="配送流程"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
        <template #left>
          <view class="u-nav-slot" slot="left">
            <view class="flex">
                <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            </view>
          </view>
        </template>
		 <template #right>
		  <view slot="right" @click="searchClick()">
			  <u-image
				:src="searchImage"
				width="20px"
				height="20px"
			  ></u-image>
		  </view>
		</template>
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;background-color: white;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 80%;">接单状态</view>
			<switch color="#2A9595" :checked="jiedanStatus" style="transform:scale(0.8);align-items: right;margin-top: 10px;" @change="switchChange" />
		</view>
		<view style="margin-top: 15px;width: 100%;height: 1px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" @click="chooseCar">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">配送车辆</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 70%;color: gray;text-align: right;">{{carid}}</view>
			<image style="margin-top: 12px;width: 25px;height: 25px;" src="/src/static/arrow.png"></image>
		</view>
		<view style="margin-top: 15px;width: 100%;height: 5px;background-color: lightgray;"></view>
		<scroll-view scroll-x="true" class="tab-scroll">
		  <!-- 【修改3】UniApp 中尽量用 view 代替 div -->
		  <view class="tab-list">
		    <view
		      v-for="tab in tabs"
		      :key="tab.title"
		      :class="['tab', activeTab === tab.title ? 'active' : '']"
		      @click="handleTabClick(tab)"
		    >
		      {{ tab.title }}
		      <view class="line" v-if="activeTab === tab.title"></view>
		    </view>
		  </view>
		</scroll-view>
		<view v-if="activeTab == '顺风约车'" style="display: flex;flex-direction: column;width: 100%;padding-bottom: 80px;">
			<view class="listItem" v-for="(item,index) in dataList" :key="index" @click="shunfengOrderDetail(item)">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<view  style="margin-left: 15px;margin-top: 13px;">
						<image style="width: 15px;height: 15px;" v-if="item.checked === false" src="/static/login/choose_unselect.png" @click="chooseselect(item,index)"></image>
						<image style="width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect(item,index)"></image>
					</view>
					<view style="margin-top: 15px;margin-left: 15px;width: 20px;height: 50px;display: flex;flex-direction: column;">
						<view style="width: 10px;height: 10px;background-color: blue;border-radius: 50%;flex-shrink: 0;align-self: center;"></view>
						<view style="margin-left: 9px;width: 1px;height: 50px;background-color: gray;"></view>
						<view style="width: 10px;height: 10px;background-color: orangered;border-radius: 50%;flex-shrink: 0;align-self: center;"></view>
					</view>
					<view style="display: flex;flex-direction: column;width: 73%;">
						<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{item.departure}}</view>
						<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;color: #2A9595;">{{item.departureRemark}}</view>
						<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{item.destination}}</view>
						<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;color: #2A9595;">{{item.destinationRemark}}</view>
					</view>
					
					<u-image style="margin-top: 10px;"
						:src="phone"
						width="25px"
						height="25px"
						@click="callClick(item.mobile)"
					></u-image>
				</view>
				<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
				<view @tap.stop class="buttonView">
					<view class="navigationBtn" @click="navigateClick(item)">导航</view>
					<view class="rabBtn" @click="rabClick(item)">抢单</view>
				</view>
				<view style="margin-top: 15px;width: 100%;height: 5px;background-color: lightgray;"></view>
			</view>
		</view>
		<view v-if="activeTab == '待接单'" style="display: flex;flex-direction: column;width: 100%;padding-bottom: 80px;">
			<view class="newcontainer">
			    <view class="btn-group">
			      <view
			        v-for="(item, index) in pointsList"
			        :key="index"
			        class="btn-item"
			        :class="{ active: activeIndex === index }"
			        @click="handleClick(index)"
			      >
			        {{ item }}
			      </view>
			    </view>
			  </view>
			  <view style="display: flex;flex-direction: column;width: 100%;">
				  <view class="canApplyItem" v-for="(item,index) in canApplyOrderList">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{item.address}}</view>
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.acceptName}}</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.mobile}}</view>
						<view v-if="item.direction == 1" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">东</view>
						<view v-if="item.direction == 2" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">西</view>
						<view v-if="item.direction == 3" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">南</view>
						<view v-if="item.direction == 4" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">北</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.kilometre}}</view>
					</view>	 
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view @tap.stop class="applyButton" @click="applyClick(item)">申请接单</view>
				  </view>
			  </view>
		</view>
		<view v-if="activeTab == '平台派单'" style="display: flex;flex-direction: column;width: 100%;padding-bottom: 80px;">
			<view style="display: flex;flex-direction: column;width: 100%;">
				  <view class="canApplyItem" v-for="(item,index) in platFormDataList">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{item.address}}</view>
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.acceptName}}</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.mobile}}</view>
						<view v-if="item.direction == 1" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">东</view>
						<view v-if="item.direction == 2" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">西</view>
						<view v-if="item.direction == 3" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">南</view>
						<view v-if="item.direction == 4" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">北</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.kilometre}}</view>
					</view>	 
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view @tap.stop style="display: flex;flex-direction: row;width: 100%;">
						<view class="acceptButton" @click="acceptClick(item)">接受</view>
						<view class="refuseButton" @click="refuseClick(item)">拒绝</view>
					</view>
					
				  </view>
			</view>
		</view>
		<view v-if="activeTab == '已申请'" style="display: flex;flex-direction: column;width: 100%;padding-bottom: 80px;">
			<view style="display: flex;flex-direction: column;width: 100%;">
				  <view class="canApplyItem" v-for="(item,index) in platFormDataList">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{item.address}}</view>
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.acceptName}}</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.mobile}}</view>
						<view v-if="item.direction == 1" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">东</view>
						<view v-if="item.direction == 2" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">西</view>
						<view v-if="item.direction == 3" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">南</view>
						<view v-if="item.direction == 4" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">北</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.kilometre}}</view>
					</view>	 
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view @tap.stop v-if="item.statusFlag !== '已拒绝'" class="applyButton" @click="cancelClick(item)">取消订单</view>
					
				  </view>
			</view>
		</view>
		<view v-if="activeTab == '进行中'" style="display: flex;flex-direction: column;width: 100%;padding-bottom: 80px;">
			<view class="newcontainer">
			    <view class="btn-group">
			      <view
			        v-for="(item, index) in runningOrderList"
			        :key="index"
			        class="btn-item"
			        :class="{ active: runningactiveIndex === index }"
			        @click="runninghandleClick(index)"
			      >
			        {{ item }}
			      </view>
			    </view>
			</view>
			<view v-if="runningactiveIndex == 0" style="display: flex;flex-direction: column;width: 100%;">
				<view class="canApplyItem" v-for="(item,index) in platFormDataList">
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view  style="margin-left: 15px;margin-top: 13px;">
							<image style="width: 15px;height: 15px;" v-if="item.checked === false" src="/static/login/choose_unselect.png" @click="quhuoChooseselect(item,index)"></image>
							<image style="width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="quhuoChooseselect(item,index)"></image>
						</view>
						<view style="margin-top: 10px;margin-left: 10px;width: 88%;display: flex;flex-direction: column;">
							<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{item.address}}</view>
							<view style="display: flex;flex-direction: row;width: 100%;">
								<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.acceptName}}</view>
								<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.mobile}}</view>
								<view v-if="item.direction == 1" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">东</view>
								<view v-if="item.direction == 2" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">西</view>
								<view v-if="item.direction == 3" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">南</view>
								<view v-if="item.direction == 4" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">北</view>
								<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.kilometre}}</view>
							</view>	 
						</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view @tap.stop style="display: flex;flex-direction: row;width: 100%;">
						<view class="acceptButton" @click="cancelClick(item)">取消订单</view>
						<view class="refuseButton" @click="runningFonfirmGoodsClick(item)">确认取货</view>
					</view>			
				</view>
			</view>
			<view v-if="runningactiveIndex == 1" style="display: flex;flex-direction: column;width: 100%;">
				<view class="canApplyItem" v-for="(item,index) in platFormDataList">
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view  style="margin-left: 15px;margin-top: 13px;">
							<image style="width: 15px;height: 15px;" v-if="item.checked === false" src="/static/login/choose_unselect.png" @click="peisongChooseselect(item,index)"></image>
							<image style="width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="peisongChooseselect(item,index)"></image>
						</view>
						<view style="margin-top: 10px;margin-left: 10px;width: 88%;display: flex;flex-direction: column;">
							<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{item.address}}</view>
							<view style="display: flex;flex-direction: row;width: 100%;">
								<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.acceptName}}</view>
								<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.mobile}}</view>
								<view v-if="item.direction == 1" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">东</view>
								<view v-if="item.direction == 2" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">西</view>
								<view v-if="item.direction == 3" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">南</view>
								<view v-if="item.direction == 4" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">北</view>
								<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.kilometre}}</view>
							</view>	 
						</view>
					</view>
					<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
					<view @tap.stop v-if="item.statusFlag !== '已拒绝'" class="applyButton" @click="runningDoneClick(item)">确认完成</view>		
				</view>
			</view>
			<view v-if="runningactiveIndex == 2" style="display: flex;flex-direction: column;width: 100%;">
				<view class="listItem" v-for="(item,index) in runningShunFengList" :key="index" @click="shunfengOrderDetail(item)">
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="margin-top: 15px;margin-left: 15px;width: 20px;height: 50px;display: flex;flex-direction: column;">
							<view style="width: 10px;height: 10px;background-color: blue;border-radius: 50%;flex-shrink: 0;align-self: center;"></view>
							<view style="margin-left: 9px;width: 1px;height: 50px;background-color: gray;"></view>
							<view style="width: 10px;height: 10px;background-color: orangered;border-radius: 50%;flex-shrink: 0;align-self: center;"></view>
						</view>
						<view style="display: flex;flex-direction: column;width: 73%;">
							<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{item.departure}}</view>
							<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;color: #2A9595;">{{item.departureRemark}}</view>
							<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{item.destination}}</view>
							<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;color: #2A9595;">{{item.destinationRemark}}</view>
						</view>
						
						<u-image style="margin-top: 10px;"
							:src="phone"
							width="25px"
							height="25px"
							@click="callClick(item.mobile)"
						></u-image>
					</view>
					<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
					<view @tap.stop v-if="item.paymentStatus !== 1" class="buttonView">
						<view class="navigationBtn" style="margin-left: 90px; " @click="navigateClick(item)">导航</view>
						<view class="rabBtn" @click="runningShunFengCancelClick(item)">取消订单</view>
						<view class="rabBtn" @click="runningShunFengSureClick(item)">确认完成</view>
					</view>
					<view @tap.stop v-if="item.paymentStatus == 1" class="buttonView">
						<view class="navigationBtn" @click="navigateClick(item)">导航</view>
						<view class="rabBtn" @click="runningShunFengSureClick(item)">确认完成</view>
					</view>
					<view style="margin-top: 15px;width: 100%;height: 5px;background-color: lightgray;"></view>
				</view>
			</view>
		</view>
		<view v-if="activeTab == '已完成'" style="display: flex;flex-direction: column;width: 100%;padding-bottom: 80px;">
			<view class="newcontainer">
			    <view class="btn-group">
			      <view
			        v-for="(item, index) in haveDoneOrderList"
			        :key="index"
			        class="btn-item"
			        :class="{ active: havedoneactiveIndex === index }"
			        @click="havedonehandleClick(index)"
			      >
			        {{ item }}
			      </view>
			    </view>
			</view>
			<view v-if="havedoneactiveIndex == 0" style="display: flex;flex-direction: column;width: 100%;">
				  <view class="canApplyItem" v-for="(item,index) in platFormDataList">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">{{item.address}}</view>
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.acceptName}}</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.mobile}}</view>
						<view v-if="item.direction == 1" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">东</view>
						<view v-if="item.direction == 2" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">西</view>
						<view v-if="item.direction == 3" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">南</view>
						<view v-if="item.direction == 4" style="margin-top: 10px;margin-left: 15px;font-size: 13px;">北</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">{{item.kilometre}}</view>
					</view>	 
				  </view>
			</view>
			<view v-if="havedoneactiveIndex == 1" style="display: flex;flex-direction: column;width: 100%;">
				<view class="listItem" v-for="(item,index) in runningShunFengList" :key="index">
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="margin-top: 15px;margin-left: 15px;width: 20px;height: 50px;display: flex;flex-direction: column;">
							<view style="width: 10px;height: 10px;background-color: blue;border-radius: 50%;flex-shrink: 0;align-self: center;"></view>
							<view style="margin-left: 8.5px;width: 1px;height: 50px;background-color: gray;"></view>
							<view style="width: 10px;height: 10px;background-color: orangered;border-radius: 50%;flex-shrink: 0;align-self: center;"></view>
						</view>
						<view style="display: flex;flex-direction: column;width: 73%;">
							<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{item.departure}}</view>
							<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;color: #2A9595;">{{item.departureRemark}}</view>
							<view style="font-size: 13px;margin-top: 10px;margin-left: 15px;">{{item.destination}}</view>
							<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;color: #2A9595;">{{item.destinationRemark}}</view>
						</view>
						
						<u-image style="margin-top: 10px;"
							:src="phone"
							width="25px"
							height="25px"
							@click="callClick(item.mobile)"
						></u-image>
					</view>
					<view style="margin-top: 15px;width: 100%;height: 5px;background-color: lightgray;"></view>
				</view>
			</view>
		</view>
		<view v-if="activeTab == '顺风约车'" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<image style="width: 15px;height: 15px;margin-top: 22px;margin-left: 15px;" v-if="allSelected == false" src="/static/login/choose_unselect.png" @click="allchooseselect()"></image>
				<image style="width: 15px;height: 15px;margin-top: 20px;margin-left: 15px;" v-else src="/static/login/choose_select.png" @click="allchooseselect()"></image>	
				<view style="font-size: 13px;margin-top: 20px;margin-left: 15px;color: black;">全选</view>
				<view class="allSelectButton" @click="rabAllClick">抢单</view>
			</view>
		</view>
		<view v-if="activeTab == '进行中' && runningactiveIndex == 0" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<image style="width: 15px;height: 15px;margin-top: 22px;margin-left: 15px;" v-if="quhuoallSelected == false" src="/static/login/choose_unselect.png" @click="quhuoallchooseselect()"></image>
				<image style="width: 15px;height: 15px;margin-top: 20px;margin-left: 15px;" v-else src="/static/login/choose_select.png" @click="quhuoallchooseselect()"></image>	
				<view style="font-size: 13px;margin-top: 20px;margin-left: 15px;color: black;">全选</view>
				<view class="incancelButton" @click="runningQuhuoCancelAllClick">取消订单</view>
				<view class="insureButton" @click="runningAllinsureClick">确认取货</view>
			</view>
		</view>
		<view v-if="activeTab == '进行中' && runningactiveIndex == 1" class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<image style="width: 15px;height: 15px;margin-top: 22px;margin-left: 15px;" v-if="peisongallSelected == false" src="/static/login/choose_unselect.png" @click="peisongallchooseselect()"></image>
				<image style="width: 15px;height: 15px;margin-top: 20px;margin-left: 15px;" v-else src="/static/login/choose_select.png" @click="peisongallchooseselect()"></image>	
				<view style="font-size: 13px;margin-top: 20px;margin-left: 15px;color: black;">全选</view>
				<view class="allSelectButton" @click="runningAlldoneClick">确认完成</view>
			</view>
		</view>
		<u-modal :show="runningSFCarshow" @confirm="runningSFCarhandleReason" title="提示" confirm-text="确认" showCancelButton="true" @cancel="runningSFCarcancelClick" style="display: flex;flex-direction: column;">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<textarea class="textAreaView" v-model="reason" placeholder="请填写取消原因"></textarea>
			</view>
		</u-modal>
   </view>
</template>

<script setup lang="ts">
	
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {ServiceShunFengYueCarGetDeliveryUserStatus,
	ServiceShunFengYueCarUpdateDeliveryStatus,
	ServiceShunFengYueCarGetDriverTaxiCarList,
	ServiceShunFengYueCarGetDriverTaxiOrderList,
	ServiceShunFengYueCarApplyTaxiOrder,
	ServiceShunFengYueCarGetCanApplyOrderList,
	ServiceShunFengYueCarApplySendOrder,
	ServiceShunFengYueCarGetOrderList,
	ServiceShunFengYueCarAgreeAcceptSendOrder,
	ServiceShunFengYueCarRefuseAcceptSendOrder,
	ServiceShunFengYueCarCancelSendOrder,
	ServiceShunFengYueCarGetMySelfTaxiOrderList,
	ServiceShunFengYueCarDriverCancelOrder,
	ServiceShunFengYueCarCompleteTaxiIOrder,
	ServiceShunFengYueCarConfirmPickUp,
	ServiceShunFengYueCarConfirmFinishOrder,
	ServiceShunFengYueCarGetYnNeedChoseFirst} from '@/api/service';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const searchImage = ref('/static/mine/searchImage.png');
	const phone = ref('/static/service/phone.png');
	const jiedanStatus = ref(false);
	const deliveryId = ref('');
	const status = ref();
	const carid = ref('');
	const carList = ref([]);
	const dataList = ref([]);
	const tabs = ref<any[]>([{title:"顺风约车"},{title:"待接单"},{title:"平台派单"},{title:"已申请"},{title:"进行中"},{title:"已完成"}]);
	const activeTab = ref<string | number>('顺风约车');
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const itemList = ref(['苹果地图','高德地图','腾讯地图']);
	const allSelected = ref(false);
	const pointsList = ref(['东服务站点','西服务站点','南服务站点','北服务站点']);
	const activeIndex = ref(0);
	const direction = ref(1);
	const canApplyOrderList = ref([]);
	const platFormDataList = ref([]);
	const listType = ref(1);
	const runningOrderList = ref(['待取货','配送中','顺风约车']);
	const runningactiveIndex = ref(0);
	const runningShunFengList = ref([]);
	const runningSFCarshow = ref(false);
	const runningSFCarItem = ref({});
	const reason = ref('');
	const quhuoallSelected = ref(false);
	const peisongallSelected = ref(false);
	const haveDoneOrderList = ref(['兼职配送','顺风约车']);
	const havedoneactiveIndex = ref(0);
	
	
	onLoad((options:any) => {
		
		deliveryId.value = options.deliveryId;
		
	});
	onMounted(() => {
		loadData();
		loadStatusData();
		getCarList();
	});
	//下拉刷新
	onPullDownRefresh(() => {
			
		 // 重置状态
		 page.value = 1;
		 hasMore.value = true;
		 noMore.value = false;
		if(activeTab.value === '顺风约车'){
				  	 
			loadData();
				  
		}else if(activeTab.value === '待接单'){
				 
			loadCanApplyOrderData();
			
		}else if(activeTab.value === '平台派单' || activeTab.value === '已申请' ){
			
			loadPlatFormOrderData();
			
		}else if(activeTab.value === '进行中' && runningactiveIndex == 0 || runningactiveIndex == 1){
			
			loadPlatFormOrderData();
		}else if(activeTab.value === '进行中' && runningactiveIndex == 2 ){
			
			loadRunningShunFengOrderData();
		}
		else if(activeTab.value === '已完成'){
			
			loadHaveDoneShunFengOrderData();
		}
	});
	//上拉刷新
	onReachBottom(() => {
			
		if (!hasMore.value) {
			
			return
		}
		page.value += 1;
		if(activeTab.value === '顺风约车'){
				  	 
			loadData();
				  
		}else if(activeTab.value === '待接单'){
				 
			loadCanApplyOrderData();
			
		}else if(activeTab.value === '平台派单' || activeTab.value === '已申请' || activeTab.value === '进行中'){
			
			loadPlatFormOrderData();
			
		}else if(activeTab.value === '进行中' && runningactiveIndex == 0 || runningactiveIndex == 1){
			
			loadPlatFormOrderData();
		}else if(activeTab.value === '进行中' && runningactiveIndex == 2 ){
			
			loadRunningShunFengOrderData();
		}
		else if(activeTab.value === '已完成'){
			
			loadHaveDoneShunFengOrderData();
		}
	});
	       
	 //顺丰约车数据       
	const loadData = async() => {
	    
			
		try {
			
			let param = {
				userId:storage.getUserId(),
				status:0,
				page:page.value,
				size:10,
				deliveryId:deliveryId.value
	
			};
			const res = await ServiceShunFengYueCarGetDriverTaxiOrderList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				dataList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					dataList.value.push(item)
				});
			}
			dataList.value = dataList.value.map(item => {
			  return {
				...item,
				checked: false  // 默认值为false
			  }
			});
			console.log(dataList.value);
			if (res.result.length === 0) {
				// 没有更多数据了
				hasMore.value = false
				noMore.value = true
				uni.showToast({
					title:'没有更多数据',
					icon:'none'
				})
				return
			}
			 // 如果返回的数据少于每页数量，说明是最后一页
			if (res.result.length < 10) {
				hasMore.value = false
				noMore.value = true
			}
				
				
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
	};
	//待接单数据
	const loadCanApplyOrderData = async() => {
	    
			
		try {
			
			let param = {
				userId:storage.getUserId(),
				direction:direction.value,
				page:page.value,
				size:10,
				deliveryId:deliveryId.value
	
			};
			const res = await ServiceShunFengYueCarGetCanApplyOrderList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				canApplyOrderList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					canApplyOrderList.value.push(item)
				});
			}
			
			
			if (res.result.length === 0) {
				// 没有更多数据了
				hasMore.value = false
				noMore.value = true
				uni.showToast({
					title:'没有更多数据',
					icon:'none'
				})
				return
			}
			 // 如果返回的数据少于每页数量，说明是最后一页
			if (res.result.length < 10) {
				hasMore.value = false
				noMore.value = true
			}
				
				
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
	};
	//平台派单数据，已申请，进行中-待取货-配送中
	const loadPlatFormOrderData = async() => {
	    
			
		try {
			
			let param = {
				userId:storage.getUserId(),
				listType:listType.value,
				page:page.value,
				size:10,
				deliveryId:deliveryId.value
	
			};
			const res = await ServiceShunFengYueCarGetOrderList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				platFormDataList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					platFormDataList.value.push(item)
				});
			}
			
			if(activeTab.value === '进行中' && runningactiveIndex == 0 || runningactiveIndex == 1){
				platFormDataList.value = platFormDataList.value.map(item => {
				  return {
					...item,
					checked: false  // 默认值为false
				  }
				});
			}
			
			if (res.result.length === 0) {
				// 没有更多数据了
				hasMore.value = false
				noMore.value = true
				uni.showToast({
					title:'没有更多数据',
					icon:'none'
				})
				return
			}
			 // 如果返回的数据少于每页数量，说明是最后一页
			if (res.result.length < 10) {
				hasMore.value = false
				noMore.value = true
			}
				
				
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
	};
	//进行中，顺风约车数据
	const loadRunningShunFengOrderData = async() => {
	    
			
		try {
			
			let param = {
				userId:storage.getUserId(),
				status:1,
				page:page.value,
				size:10,
				deliveryId:deliveryId.value
	
			};
			const res = await ServiceShunFengYueCarGetMySelfTaxiOrderList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				runningShunFengList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					runningShunFengList.value.push(item)
				});
			}
			
			
			if (res.result.length === 0) {
				// 没有更多数据了
				hasMore.value = false
				noMore.value = true
				uni.showToast({
					title:'没有更多数据',
					icon:'none'
				})
				return
			}
			 // 如果返回的数据少于每页数量，说明是最后一页
			if (res.result.length < 10) {
				hasMore.value = false
				noMore.value = true
			}
				
				
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
	};
	//进行中，顺风约车数据
	const loadHaveDoneShunFengOrderData = async() => {
	    
			
		try {
			
			let param = {
				userId:storage.getUserId(),
				status:4,
				page:page.value,
				size:10,
				deliveryId:deliveryId.value
	
			};
			const res = await ServiceShunFengYueCarGetMySelfTaxiOrderList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				runningShunFengList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					runningShunFengList.value.push(item)
				});
			}
			
			
			if (res.result.length === 0) {
				// 没有更多数据了
				hasMore.value = false
				noMore.value = true
				uni.showToast({
					title:'没有更多数据',
					icon:'none'
				})
				return
			}
			 // 如果返回的数据少于每页数量，说明是最后一页
			if (res.result.length < 10) {
				hasMore.value = false
				noMore.value = true
			}
				
				
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
	};
	//进行中，待取货，确认取货
	const runningFonfirmGoodsClick = async(item:any) => {
		
		try {
			let param = {
				userId: storage.getUserId(),
				deliveryId: deliveryId.value,
				recordIds:item.recordIds,
				orderNos:item.orderNo,
				mobile:storage.getPhone(),
				hostNo:storage.getHostNo(),
				firstOrderNo:item.orderNo
			};
			ServiceShunFengYueCarConfirmPickUp(param).then((res: any) => {
				
				console.log(res);
				
				if(res.success == true){
					
					
					uni.showToast({
						title:'确认取货成功',
						icon:'none'
					})
					listType.value = 3;
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
					loadPlatFormOrderData();
					
				}else{
					
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	//进行中，待取货，确认完成
	const runningDoneClick = async(item:any) => {
		
		try {
			let param = {
				userId: storage.getUserId(),
				deliveryId: deliveryId.value,
				recordIds:item.recordIds,
				orderNos:item.orderNo,
				mobile:storage.getPhone(),
				hostNo:storage.getHostNo()
				
			};
			ServiceShunFengYueCarConfirmFinishOrder(param).then((res: any) => {
				
				console.log(res);
				
				if(res.success == true){
					
					
					uni.showToast({
						title:'完成订单成功',
						icon:'none'
					})
					listType.value = 4;
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
					loadPlatFormOrderData();
					
				}else{
					
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	//进行中，顺丰约车，取消订单
	const runningShunFengCancelClick = (item:any) => {
		
		runningSFCarshow.value = true;
		runningSFCarItem.value = item;
	};
	const runningSFCarhandleReason = () => {
		
		if(reason.value.length == 0){
			
			uni.showToast({
				title:'请填写取消原因！',
				icon:'none'
			})
			return
		}
		runningSFCarshow.value = true;
		//
		try {
			let param = {
				userId: storage.getUserId(),
				orderNo: runningSFCarItem.value.orderNo,
				reason:reason.value
			};
			ServiceShunFengYueCarDriverCancelOrder(param).then((res: any) => {
				
				console.log(res);
				
				if(res.success == true){
					
					
					uni.showToast({
						title:'订单已取消！',
						icon:'none'
					})
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
					loadRunningShunFengOrderData();
					
				}else{
					
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	
	const runningSFCarcancelClick = () => {
		
		runningSFCarshow.value = false;
	};
	
	const runningShunFengSureClick = async(item:any) => {
		//
		try {
			let param = {
				userId: storage.getUserId(),
				deliveryId: deliveryId.value,
				orderNos:item.orderNo,
				mobile:storage.getPhone()
			};
			ServiceShunFengYueCarCompleteTaxiIOrder(param).then((res: any) => {
				console.log(res);
				// dataDict.value = res.result;
				
				if(res.success == true){
					
					uni.showToast({
						title:'订单完成!',
						icon:'none'
					})
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
					loadRunningShunFengOrderData();
					
				}else{
					
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	const loadStatusData = () => {
		try {
			let param = {
				userId: storage.getUserId(),
				deliveryId: deliveryId.value
			};
			ServiceShunFengYueCarGetDeliveryUserStatus(param).then((res: any) => {
				console.log(res);
				// dataDict.value = res.result;
				jiedanStatus.value = res.result;
				
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	const getCarList = async() => {
		
		try {
			let param = {
				userId: storage.getUserId(),
				deliveryId: deliveryId.value
			};
			ServiceShunFengYueCarGetDriverTaxiCarList(param).then((res: any) => {
				
				console.log(res);
				
				carList.value = res.result;
				carid.value = res.result[0].carNo;
				//保存carid
				storage.saveCarid(carid.value);
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	
	const chooseCar = () => {
		
		if(carList.value.length > 0){
			
			uni.showToast({
				title:'无法选择更多！',
				icon:'none',
			})
		}
		
	};
	const searchClick = () => {
		
	};
	const switchChange = async(e:any) =>{
		
		console.log(e.detail.value);
		jiedanStatus.value = e.detail.value;
		if (e.detail.value == false) {
			
			status.value = 2;
			
			if(activeTab.value === '顺风约车'){
					  	 
				dataList.value = [];
					  
			}else if(activeTab.value === '待接单'){
					 
				canApplyOrderList.value = [];
				
			}else if(activeTab.value === '平台派单'){
					 
				platFormDataList.value = [];
				
			}else if(activeTab.value === '已申请'){
					 
				platFormDataList.value = [];
				
			}else if(activeTab.value === '进行中' && runningactiveIndex == 0 || runningactiveIndex == 1){
					 
				platFormDataList.value = [];
				
			}else if(activeTab.value === '进行中' && runningactiveIndex == 2){
				
				runningShunFengList.value = [];
				
			}else if(activeTab.value === '已完成' && runningactiveIndex == 0){
				
				platFormDataList.value = [];
				
			}else if(activeTab.value === '已完成' && runningactiveIndex == 1){
				
				runningShunFengList.value = [];
			}
		}else
		{
			status.value = 1;
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			
			if(activeTab.value === '顺风约车'){
					  	 
				loadData();
					  
			}else if(activeTab.value === '待接单'){
					 
				loadCanApplyOrderData();
				
			}else if(activeTab.value === '平台派单'){
					 
				loadPlatFormOrderData();
				
			}else if(activeTab.value === '进行中' && runningactiveIndex == 0 || runningactiveIndex == 1){
				
				loadPlatFormOrderData();
				
			}else if(activeTab.value === '进行中' && runningactiveIndex == 2){
				
				loadRunningShunFengOrderData();	  
				
			}else if(activeTab.value === '已完成' && runningactiveIndex == 0){
				
				loadPlatFormOrderData();
				
			}else if(activeTab.value === '已完成' && runningactiveIndex == 1){
				
				loadHaveDoneShunFengOrderData();
			}
			
		}
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				status:status.value,
				deliveryId:deliveryId.value
			};
			ServiceShunFengYueCarUpdateDeliveryStatus(param).then((res) =>{
							
				console.log(res);
				
				uni.showToast({
					title:res.message,
					icon:'none'
				})
				
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	// 点击 Tab，切换顺风约车，待接单，平台派单，已申请，进行中，已完成
	const handleTabClick = (tab: any) => {
	  console.log(tab);
	  activeTab.value = tab.title;
	  // getGoodsList(activeTab.value);
	  if(tab.title === '顺风约车'){
		  
		  page.value = 1;
		  hasMore.value = true;
		  noMore.value = false;
		  loadData();
		  
	  }else if(tab.title === '待接单'){
		  
		  page.value = 1;
		  hasMore.value = true;
		  noMore.value = false;
		  loadCanApplyOrderData();
		  
	  }else if(tab.title  === '平台派单'){
			
			listType.value = 1;
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadPlatFormOrderData();
			
	  }else if(tab.title  === '已申请'){
			
			listType.value = 2;
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadPlatFormOrderData();
			
	  }else if(tab.title  === '进行中' && runningactiveIndex.value == 0){
			
			listType.value = 3;
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadPlatFormOrderData();
			
	  }else if(tab.title  === '进行中' && runningactiveIndex.value == 1){
			
			listType.value = 4;
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadPlatFormOrderData();
			
	  }else if(tab.title  === '进行中' && runningactiveIndex.value == 2){
			
			listType.value = 3;
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadRunningShunFengOrderData();
			
	  }else if(tab.title  === '已完成' && havedoneactiveIndex.value == 0){
			
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadPlatFormOrderData();
			
	  }else if(tab.title  === '已完成' && havedoneactiveIndex.value == 1){
			
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadHaveDoneShunFengOrderData();
	  }
	};
	//导航
	const navigateClick = (item:any) => {
		
		uni.showActionSheet({
			itemList: itemList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				const mapname = itemList.value[res.tapIndex]
				
				uni.openLocation({
				  latitude: Number(item.destinationlat),
				  longitude: Number(item.destinationlong),
				  name: item.destination,
				  address: item.destination,
				  scale: 18,
				  coordinateType: 'gcj02', // 建议显式指定，见下方说明
				  success: () => console.log('打开地图成功'),
				  fail: (err) => console.error('打开地图失败', err)
				});
				
				if(mapname === '苹果地图'){
					
				}else if(mapname === '高德地图'){
					
				}else if(mapname === '腾讯地图'){
				}
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	//抢单
	const rabClick = (item:any) => {
		
		if(jiedanStatus.value === false){
			
			uni.showToast({
				title:'您还没有车辆,无法抢单！',
				icon:'none'
			})
			return
		}
		//
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				orderNos:item.orderNos,
				deliveryId:deliveryId.value,
				carNo:carid.value
			};
			ServiceShunFengYueCarApplyTaxiOrder(param).then((res) =>{
							
				console.log(res);
				
				if(res.success === true){
					
					uni.showToast({
						title:'抢单成功!',
						icon:'none'
					})
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
					loadData();
					
				}else
				{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		}catch (error) {
			console.log(error)
		}
		
	};
	const callClick = (phone:any) => {
		uni.makePhoneCall({
			phoneNumber:phone,
			success: () => {
				console.log('拨打电话成功')
			  },
			  fail: (error) => {
				console.error('拨打电话失败:', error)
				uni.showToast({
					title:'拨打电话失败，请重试',
					icon:'none'
				})
			  }
		})
	};
	//顺风约车，单选，全选，全选抢单
	const chooseselect = (item:any,index:any) => {
		
		item.checked = !item.checked;
		console.log(dataList.value);
		allSelected.value = dataList.value.length > 0 && dataList.value.every(item => item.checked === true);
		console.log(allSelected.value);
	};
	const allchooseselect = () => {
		allSelected.value = !allSelected.value;
		if(allSelected.value){
			
			dataList.value.forEach(item => {
				item.checked = true;
			});
			
		}else
		{
			// 取消全选：将所有项的 checked 设为 false
			dataList.value.forEach(item => {
				item.checked = false;
			});
		}
	};
	const rabAllClick = async() => {
		
		// 1. 过滤出所有已选中的订单（checked === true）
		    const selectedItems = dataList.value.filter(item => item.checked === true);
		
		    // 2. 如果没有选中任何订单，提示并终止
		    if (selectedItems.length === 0) {
		        // 根据你的项目环境选择提示方式
		        uni.showToast({ title: '请选择订单', icon: 'none' }); // uni-app 环境
		        // 或者 alert('请选择订单'); // 浏览器环境
		        // 或者 this.$message.warning('请选择订单'); // Element UI
		        return;
		    }
		
		    // 3. 提取 orderNo 并用逗号拼接成字符串
		    const orderNos = selectedItems.map(item => item.orderNo).join(',');
			if(jiedanStatus.value === false){
				
				uni.showToast({
					title:'您还没有车辆,无法抢单！',
					icon:'none'
				})
				return
			}
			//
			try {
				
				let param = {
					
					userId:storage.getUserId(),
					orderNos:orderNos,
					deliveryId:deliveryId.value,
					carNo:carid.value
				};
				ServiceShunFengYueCarApplyTaxiOrder(param).then((res) =>{
								
					console.log(res);
					
					if(res.success === true){
						
						uni.showToast({
							title:'抢单成功!',
							icon:'none'
						})
						page.value = 1;
						hasMore.value = true;
						noMore.value = false;
						loadData();
						
					}else
					{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
					}
					
				});
			}catch (error) {
				console.log(error)
			}
			
	};
	//进行中，待取货，单选，全选，
	const quhuoChooseselect = (item:any,index:any) => {
		item.checked = !item.checked;
		console.log(platFormDataList.value);
		quhuoallSelected.value = platFormDataList.value.length > 0 && platFormDataList.value.every(item => item.checked === true);
		console.log(quhuoallSelected.value);
	};
	const quhuoallchooseselect = () => {
		quhuoallSelected.value = !quhuoallSelected.value;
		if(quhuoallSelected.value){
			
			platFormDataList.value.forEach(item => {
				item.checked = true;
			});
			
		}else
		{
			// 取消全选：将所有项的 checked 设为 false
			platFormDataList.value.forEach(item => {
				item.checked = false;
			});
		}
	};
	//进行中，待取货，全选，取消订单
	const runningQuhuoCancelAllClick = async() => {
		
		// 1. 过滤出所有已选中的订单（checked === true）
		    const selectedItems = platFormDataList.value.filter(item => item.checked === true);
		
		    // 2. 如果没有选中任何订单，提示并终止
		    if (selectedItems.length === 0) {
		        // 根据你的项目环境选择提示方式
		        uni.showToast({ title: '请选择订单', icon: 'none' }); // uni-app 环境
		        // 或者 alert('请选择订单'); // 浏览器环境
		        // 或者 this.$message.warning('请选择订单'); // Element UI
		        return;
		    }
		
		    // 3. 提取 orderNo 并用逗号拼接成字符串
		    const orderNos = selectedItems.map(item => item.orderNo).join(',');
			const recordIds = selectedItems.map(item => item.recordId).join(',');
			if(jiedanStatus.value === false){
				
				uni.showToast({
					title:'您还没有车辆,无法抢单！',
					icon:'none'
				})
				return
			}
			//
			try {
				
				let param = {
					
					userId:storage.getUserId(),
					deliveryId:deliveryId.value,
					orderNos:orderNos,
					recordIds:recordIds
				};
				ServiceShunFengYueCarCancelSendOrder(param).then((res) =>{
								
					console.log(res);
					
					if(res.success === true){
						
						uni.showToast({
							title:'订单取消成功!',
							icon:'none'
						})
						
						page.value = 1;
						hasMore.value = true;
						noMore.value = false;
						loadPlatFormOrderData();
						
					}else
					{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
					}
					
				});
			}catch (error) {
				console.log(error)
			}
			
	};
	//进行中，待取货，全选，确认取货
	const runningAllinsureClick = async() => {
		
		// 1. 过滤出所有已选中的订单（checked === true）
		    const selectedItems = platFormDataList.value.filter(item => item.checked === true);
		
		    // 2. 如果没有选中任何订单，提示并终止
		    if (selectedItems.length === 0) {
		        // 根据你的项目环境选择提示方式
		        uni.showToast({ title: '请选择订单', icon: 'none' }); // uni-app 环境
		        // 或者 alert('请选择订单'); // 浏览器环境
		        // 或者 this.$message.warning('请选择订单'); // Element UI
		        return;
		    }
			// 3. 提取 orderNo 并用逗号拼接成字符串
			const orderNos = selectedItems.map(item => item.orderNo).join(',');
			const recordIds = selectedItems.map(item => item.recordId).join(',');
			if(jiedanStatus.value === false){
				
				uni.showToast({
					title:'您还没有车辆,无法抢单！',
					icon:'none'
				})
				return
			}
			//
			try {
				
				let param = {
					
					userId:storage.getUserId(),
					deliveryId:deliveryId.value,
				};
				ServiceShunFengYueCarGetYnNeedChoseFirst(param).then((res) =>{
								
					console.log(res);
						
						try {
							
							let param = {
								
								userId:storage.getUserId(),
								deliveryId:deliveryId.value,
								orderNos:orderNos,
								recordIds:recordIds,
								mobile:storage.getPhone(),
								hostNo:storage.getHostNo(),
								firstOrderNo:orderNos?orderNos:''
							};
							ServiceShunFengYueCarConfirmPickUp(param).then((res) =>{
											
								console.log(res);
								
								if(res.success === true){
									
									uni.showToast({
										title:'确认取货成功!',
										icon:'none'
									})
									
									page.value = 1;
									hasMore.value = true;
									noMore.value = false;
									loadPlatFormOrderData();
									
								}else
								{
									uni.showToast({
										title:res.message,
										icon:'none'
									})
								}
								
							});
						}catch (error) {
							console.log(error)
						}
					
				});
			}catch (error) {
				console.log(error)
			}
			
	};
	const peisongChooseselect = (item:any,index:any) => {
		item.checked = !item.checked;
		console.log(platFormDataList.value);
		peisongallSelected.value = platFormDataList.value.length > 0 && platFormDataList.value.every(item => item.checked === true);
		console.log(peisongallSelected.value);
	};
	const peisongallchooseselect = () => {
		peisongallSelected.value = !peisongallSelected.value;
		if(peisongallSelected.value){
			
			platFormDataList.value.forEach(item => {
				item.checked = true;
			});
			
		}else
		{
			// 取消全选：将所有项的 checked 设为 false
			platFormDataList.value.forEach(item => {
				item.checked = false;
			});
		}
	};
	const runningAlldoneClick = async() => {
		
		// 1. 过滤出所有已选中的订单（checked === true）
		const selectedItems = platFormDataList.value.filter(item => item.checked === true);
	
		// 2. 如果没有选中任何订单，提示并终止
		if (selectedItems.length === 0) {
			// 根据你的项目环境选择提示方式
			uni.showToast({ title: '请选择订单', icon: 'none' }); // uni-app 环境
			// 或者 alert('请选择订单'); // 浏览器环境
			// 或者 this.$message.warning('请选择订单'); // Element UI
			return;
		}
	
		// 3. 提取 orderNo 并用逗号拼接成字符串
		const orderNos = selectedItems.map(item => item.orderNo).join(',');
		const recordIds = selectedItems.map(item => item.recordId).join(',');
		if(jiedanStatus.value === false){
			
			uni.showToast({
				title:'您还没有车辆,无法抢单！',
				icon:'none'
			})
			return
		}
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				deliveryId:deliveryId.value,
				orderNos:orderNos,
				recordIds:recordIds,
				mobile:storage.getPhone(),
				hostNo:storage.getHostNo(),
				
			};
			ServiceShunFengYueCarConfirmFinishOrder(param).then((res) =>{
							
				console.log(res);
				
				if(res.success === true){
					
					uni.showToast({
						title:'完成订单成功!',
						icon:'none'
					})
					
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
					loadPlatFormOrderData();
					
				}else
				{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//待接单，东服务站点，西服务站点，南服务站点，北服务站点
	const handleClick = (index) => {
	  // 如果点击的是同一个，可以取消选中（可选），若不需要取消则直接赋值
	  // activeIndex.value = activeIndex.value === index ? -1 : index; // 支持取消选中
	  activeIndex.value = index; // 仅选中当前，不取消
	  if(index == 0){
		  
		  direction.value = 1;
		  
	  }else if(index == 1){
		  
		  direction.value = 2;
		  
	  }else if(index == 2){
		  
		  direction.value = 3;
		  
	  }else if(index == 3){
		  
		  direction.value = 4;
		  
	  }
	  
	  loadCanApplyOrderData();
	};
	//进行中，待取货，配送中，顺风约车
	const runninghandleClick = (index) => {
		
		runningactiveIndex.value = index; // 仅选中当前，不取消
		if(index == 0){
			
			//待取货	  
			listType.value = 3;
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadPlatFormOrderData();
				  
		}else if(index == 1){
				
			//配送中  
			listType.value = 4;
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadPlatFormOrderData();
				  
		}else if(index == 2){
				  
			// 顺风约车
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadRunningShunFengOrderData()	  
		}
		
		// loadCanApplyOrderData();
	};
	//已完成，兼职配送，顺风约车
	const havedonehandleClick = (index) => {
		
		havedoneactiveIndex.value = index; // 仅选中当前，不取消
		if(index == 0){
			
			//待取货	  
			listType.value = 5;
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadPlatFormOrderData();
				  
		}else if(index == 1){
				
			//配送中  
			
			page.value = 1;
			hasMore.value = true;
			noMore.value = false;
			loadHaveDoneShunFengOrderData();
				  
		}
	};
	const applyClick = async(item:any) => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				orderNos:item.orderNo,
				deliveryId:deliveryId.value,
				
			};
			ServiceShunFengYueCarApplySendOrder(param).then((res) =>{
							
				console.log(res);
				
				if(res.success === true){
					
					uni.showToast({
						title:'申请提交成功!',
						icon:'none'
					})
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
					loadCanApplyOrderData();
					
				}else
				{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//平台派单，接受
	const acceptClick = async(item:any) => {
		
		//
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				orderNo:item.orderNo,
				deliveryId:deliveryId.value,
				recordId:item.recordId
			};
			ServiceShunFengYueCarAgreeAcceptSendOrder(param).then((res) =>{
							
				console.log(res);
				
				if(res.success === true){
					
					uni.showToast({
						title:'申请提交成功!',
						icon:'none'
					})
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
					loadPlatFormOrderData();
					
				}else
				{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//平台派单，拒绝
	const refuseClick = async(item:any) => {
		
		//
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				orderNo:item.orderNo,
				deliveryId:deliveryId.value,
				recordId:item.recordId
			};
			ServiceShunFengYueCarRefuseAcceptSendOrder(param).then((res) =>{
							
				console.log(res);
				
				if(res.success === true){
					
					
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
					loadPlatFormOrderData();
					
				}else
				{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	const cancelClick = async(item:any) => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				orderNos:item.orderNo,
				deliveryId:deliveryId.value,
				recordIds:item.recordId
			};
			ServiceShunFengYueCarCancelSendOrder(param).then((res) =>{
							
				console.log(res);
				
				if(res.success === true){
					
					
					page.value = 1;
					hasMore.value = true;
					noMore.value = false;
					loadPlatFormOrderData();
					
				}else
				{
					uni.showToast({
						title:res.message,
						icon:'none'
					})
				}
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//顺丰约车详情
	const shunfengOrderDetail = (item:any) => {
		
		uni.navigateTo({
		  url: `/pages/service/shunfengCar/shunfengOrderDetail?deliveryId=${deliveryId.value}&orderNo=${item.orderNo}`
		});
	};
    const goBack= () => {
        
        uni.navigateBack()
    };
	
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
		  .tab-scroll {
		    width: 100%;
		    white-space: nowrap; /* 确保横向滚动生效 */
		  }
		  .tab-list {
		    display: inline-flex;
		    padding: 10rpx;
		  }
		  .tab {
		    position: relative;
		    padding: 20rpx 20rpx;
		    color: #333;
		    font-size: 15px;
		    flex-shrink: 0;
		    cursor: pointer;
		  }
		  .tab.active {
		    color: #2a9595;
		    font-weight: bold;
		  }
		  .line {
		    position: absolute;
		    bottom: -10rpx;
		    left: 50%;
		    transform: translateX(-50%);
		    width: 50px;
		    height: 4rpx;
		    background: #2a9595;
		    border-radius: 2rpx;
		  }
		  .listItem{
			  display: flex;
			  flex-direction: column;
			  width: 100%;
		  }
		  .buttonView{
			  display: flex;
			  flex-direction: row;
			  width:100%;
			  margin-top: 10px;
		  }
		  .navigationBtn{
			   margin-top: 10px;
			   background-color: #2A9595;
			   border-radius: 12.5px;
			   color: white;
			   font-size: 13px;
			   margin-left: 190px; 
			   display: flex;
			   justify-content: center; /* 水平居中 */
			   align-items: center;     /* 垂直居中 */
			   height: 25px;           /* 需要设置高度 */
			   width: 80px;             /* 需要设置宽度 */
		  }
		  .rabBtn{
			   margin-top: 10px;
			   background-color: #2A9595;
			   border-radius: 12.5px;
			   color: white;
			   font-size: 13px;
			   margin-left: 20px; 
			   display: flex;
			   justify-content: center; /* 水平居中 */
			   align-items: center;     /* 垂直居中 */
			   height: 25px;           /* 需要设置高度 */
			   width: 80px;             /* 需要设置宽度 */
		  }
		  .footer-container {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 70px;
			background-color: white;
			box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
			z-index: 100;
			color: white;
			display: flex;
			justify-content: center; /* 水平居中 */
			align-items: center;     /* 垂直居中 */
			
		  }       
		  .allSelectButton{
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 30px;           /* 需要设置高度 */
			  width: 80px;
			  margin-right: 10px;
			  font-size: 13px;
			  color: white;
			  background-color: #2A9595;
			  border-radius: 15px;
			  margin-left: 220px;
			  margin-top: 20px;
		  }
		  .incancelButton{
			  
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 30px;           /* 需要设置高度 */
			  width: 80px;
			  margin-right: 10px;
			  font-size: 13px;
			  color: white;
			  background-color: #2A9595;
			  border-radius: 15px;
			  margin-left: 110px;
			  margin-top: 20px;
		  }
		  .insureButton{
			  
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 30px;           /* 需要设置高度 */
			  width: 80px;
			  margin-right: 10px;
			  font-size: 13px;
			  color: white;
			  background-color: #2A9595;
			  border-radius: 15px;
			  margin-left: 20px;
			  margin-top: 20px;
		  }
		 .newcontainer {
		   padding: 0 15px;
		     box-sizing: border-box;
		 }
		 
		 .btn-group {
			 margin-top: 15px;
		  display: flex;
		    gap: 15px;
		    justify-content: flex-start;
		   
		 }
		 
		 .btn-item {
			 
			flex: 1;                 /* 均分宽度 */
			  height: 30px;
			  border-radius: 15px;
			  background-color: #cccccc;
			  color: #ffffff;
			  font-size: 12px;
			  line-height: 30px;
			  text-align: center;
			  cursor: pointer;
			  user-select: none;
			  transition: background-color 0.2s ease;
			  white-space: nowrap;
			  padding: 0 4px;          /* 少量内边距防止文字贴边 */
		 }
		 
		 /* 激活态：背景绿色 */
		 .btn-item.active {
		   background-color: #2A9595;
		 }
		 .canApplyItem{
			 display: flex;
			 flex-direction: column;
			 width: 100%;
		 }
		 .applyButton{
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 25px;           /* 需要设置高度 */
			 width: 80px;
			 margin-right: 10px;
			 font-size: 13px;
			 color: white;
			 background-color: #2A9595;
			 border-radius: 6px;
			 margin-left: 260px;
			 margin-top: 10px;
		 }
		 .acceptButton{
			 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 25px;           /* 需要设置高度 */
			 width: 80px;
			 margin-right: 10px;
			 font-size: 13px;
			 color: white;
			 background-color: #2A9595;
			 border-radius: 6px;
			 margin-left: 160px;
			 margin-top: 10px;
		 }
		 .refuseButton{
		 			 
			 display: flex;
			 justify-content: center; /* 水平居中 */
			 align-items: center;     /* 垂直居中 */
			 height: 25px;           /* 需要设置高度 */
			 width: 80px;
			 margin-right: 10px;
			 font-size: 13px;
			 color: white;
			 background-color: #2A9595;
			 border-radius: 6px;
			 margin-left: 20px;
			 margin-top: 10px;
		 }
		 .textAreaView{
			 margin-top: 10px;
			 margin-left: 4%;
			 width: 92%;height: 100px;
			 border: lightgray 1px solid;
			 font-size: 13px;
		 }
}
</style>