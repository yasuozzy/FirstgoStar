<template>
    <view class="main">
        <u-navbar
          title="添加户主"
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
        </u-navbar>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">户主姓名</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<input class="searchlocation" v-model="name" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">民族</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<input class="searchlocation" v-model="nation" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 80px;">籍贯</view>
			<input class="searchlocation" v-model="hometown" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 120px;">与户屋产权人关系</view>
			<input class="searchlocation" v-model="relationShip" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">身份证号</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<input class="searchlocation" v-model="idCard" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 80px;">户籍所在地</view>
			<input class="searchlocation" v-model="registeredResidence" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 80px;">是否长期居住</view>
			<view class="housetypeChoose">
				
				<u-checkbox
					:customStyle="{marginBottom: '8px'}"
					v-for="(item, index) in livetimeList"
					:key="index"
					shape="circle"
					:checked="selectedValue === item.value"
					 @change="handleChange(item.value)"
					:label="item.name"
					activeColor="#2A9595"
					
					            >
				</u-checkbox>
				
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 80px;">是否养宠物</view>
			<view class="housetypeChoose">
				
				<u-checkbox
					:customStyle="{marginBottom: '8px'}"
					v-for="(item, index) in petList"
					:key="index"
					shape="circle"
					:checked="selectedPetValue === item.value"
					 @change="handlePetChange(item.value)"
					:label="item.name"
					activeColor="#2A9595"
					
					            >
				</u-checkbox>
				
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">联系电话</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<input class="searchlocation" v-model="phone" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 80px;">婚姻状况</view>
			<!-- <input class="searchlocation" v-model="maritalstatus" placeholder="请填写" type="text" /> -->
			<view style="margin-left: 15px;width: 230px;height: 30px;margin-top: 15px;font-size: 13px;" @click="choosemaritalstatus()">{{maritalstatus}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 80px;">政治面貌</view>
			<!-- <input class="searchlocation" v-model="politicalstatus" placeholder="请填写" type="text" /> -->
			<view style="margin-left: 15px;width: 230px;height: 30px;margin-top: 15px;font-size: 13px;" @click="choosepoliticalstatus()">{{politicalstatus}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;width: 80px;">入党时间</view>
			<!-- <input class="searchlocation" v-model="partytime" placeholder="请填写" type="text" /> -->
			<view class="endView" @click="rudangshow = true">{{partytime}}
				<u-datetime-picker
				title="入党时间"
				
				            :show="rudangshow"
				            v-model="value1"
				            mode="date"
							@confirm="rudangConfirm"
							@cancel="rudangshow = false"
				    ></u-datetime-picker>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">党组织关系所在党支部(全称)</view>
			<input class="searchlocation" v-model="partybranch" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">宗教信仰</view>
			<input class="searchlocation" v-model="religion" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">有无社会救济</view>
		<textarea class="textAreaView" v-model="socialssistance" placeholder="请填写"></textarea>
		<view style="margin-top: 10px;margin-left: 4%;width: 92%;font-size: 12px;">{{tips}}</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">是否现役/退役士兵</view>
			<view style="margin-left: 15px;width: 230px;height: 30px;margin-top: 15px;font-size: 13px;" @click="chooseSoldier()">{{choosesoldier}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">工作单位(职业)</view>
			<input class="searchlocation" v-model="work" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">参加工作时间</view>
			<view class="startView" @click="show = true">{{chooseworktime}}
				<u-datetime-picker
				title="参加工作时间"
				
			                :show="show"
			                v-model="value1"
			                mode="date"
							@confirm="handleConfirm"
							@cancel="show = false"
			        ></u-datetime-picker>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">离退休时间</view>
			<view class="endView" @click="endshow = true">{{chooseretairtime}}
				<u-datetime-picker
				title="离退休时间"
				
				            :show="endshow"
				            v-model="value1"
				            mode="date"
							@confirm="endConfirm"
							@cancel="endshow = false"
				    ></u-datetime-picker>
			</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">特长</view>
			<input class="searchlocation" v-model="specialty" placeholder="请填写" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view class="buttonView" @click="tijiaoClick()">提交</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import {MinePartyWangGeMessageAddMainKeeper,MinePartyWangGeMessageGetKeeperInfo,MinePartyWangGeMessageEditKeeperInfo} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#FF0000");
	const house_id = ref('');
	const livetimeList = ref([{
			name: '是',
			value: 'option1'
		},
		{
			name: '否',
			value: 'option2'
		},
				  
	 ]);
	 const selectedValue = ref('option1'); // 当前选中的值
	 const petList = ref([{
			 name: '是',
			 value: 'option1'
		 },
		 {
			 name: '否',
			 value: 'option2'
		 },
				   
	  ]);
	  const selectedPetValue = ref('option2'); // 当前选中的值
	  const name = ref('');
	  const nation = ref('');
	  const hometown = ref('');
	  const relationShip = ref('');
	  const idCard = ref('');
	  const registeredResidence = ref('');
	  const long_live = ref('是');
	  const pet = ref('否');
	  const phone = ref('');
	  const maritalList = ref(['未婚', '已婚', '离异', '丧偶']);
	  const maritalstatus = ref('请选择');
	  const politicalList = ref(['党员', '预备党员', '团员', '群众']);
	  const politicalstatus = ref('请选择');
	  const partytime = ref('请选择');
	  const partybranch = ref('');
	  const religion = ref('');
	  const socialssistance = ref('');
	  const tips = ref('社会救助主要指低保、特困、孤(事实无人抚养儿童)困儿童，残疾人两项补贴(重度残疾人护理补贴，困难残疾人生活补贴)，另外还包括是否独生子女，失独家庭，残疾(无补贴)等');
	  const choosesoldier = ref('请选择');
	  const work = ref('');
	  const chooseworktime = ref('请选择');
	  const chooseretairtime = ref('请选择');
	  const specialty = ref('');
	  const itemList = ref(['现役军人', '退伍军人', '非军人']);
	  const rudangshow = ref(false);
	  const show = ref(false);
	  const endshow = ref(false);
	  const value1 = ref( Number(new Date()));
	  const isedit = ref('0');
           
		onLoad((options:any) => {
			
			 house_id.value = options.house_id;
			if (options.isedit) {
				
				 isedit.value = options.isedit;
			}
		});
        onMounted(() => {
			
			if (isedit.value === '1') {
				
				 init();
			}
          
        });
       
        const init = async() => {
				
			try {
				
				let param = {
					
					id: house_id.value,
					
				};
				const res = await MinePartyWangGeMessageGetKeeperInfo(param);
								
				console.log(res);
				const dataDict = res.result;
				name.value = dataDict.name;
				nation.value = dataDict.nationality;
				hometown.value = dataDict.hometown;
				relationShip.value = dataDict.relationShip;
				idCard.value = dataDict.id_card;
				registeredResidence.value = dataDict.census;
				if (dataDict.long_live === '是') {
						
					selectedValue.value = 'option1';
				}else
				{
					selectedValue.value = 'option2';
				}
				if (dataDict.pet === '是') {
						
					selectedPetValue.value = 'option1';
				}else
				{
					selectedPetValue.value = 'option2';
				}
				 phone.value = dataDict.mobile;
				 maritalstatus.value = dataDict.marital_status;
				 politicalstatus.value = dataDict.political_status;
				 partytime.value = dataDict.party_time;
				 partybranch.value = dataDict.party_branch;
				 religion.value = dataDict.religion;
				 socialssistance.value = dataDict.social_ssistance;
				 choosesoldier.value = dataDict.soldier;
				 work.value = dataDict.work;
				 chooseworktime.value = dataDict.join_work;
				 chooseretairtime.value = dataDict.retired;
				 specialty.value = dataDict.specialty;
					
				
			}catch (error) {
				console.log(error)
			}
		};
		const handleChange = (value:any) => {
			 selectedValue.value = value;
			if (value === 'option1') {
				 long_live.value = '是';
			}else if (value === 'option2') {
				 long_live.value = '否';
			}
			
		};
		const handlePetChange = (value:any) => {
			 selectedPetValue.value = value;
			if (value === 'option1') {
				 pet.value = '是';
			}else if (value === 'option2') {
				 pet.value = '否';
			}
		};
		const choosemaritalstatus = () =>{
				
			uni.showActionSheet({
				itemList:  maritalList.value,
				success: (res) => {
					// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
					// console.log( itemList[res.tapIndex])
					 maritalstatus.value =  maritalList.value[res.tapIndex];
					console.log( maritalstatus.value);
				},
				fail: (res) => {
					console.log(res.errMsg);
				}
			});
			
		};
		const choosepoliticalstatus = () => {
			uni.showActionSheet({
				itemList:  politicalList.value,
				success: (res) => {
					// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
					// console.log( itemList[res.tapIndex])
					 politicalstatus.value =  politicalList.value[res.tapIndex];
					console.log( politicalstatus.value);
				},
				fail: (res) => {
					console.log(res.errMsg);
				}
			});
		};
		const chooseSoldier = () => {
			uni.showActionSheet({
				itemList:  itemList.value,
				success: (res) => {
					// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
					// console.log( itemList[res.tapIndex])
					choosesoldier.value =  itemList.value[res.tapIndex];
					console.log( choosesoldier.value);
				},
				fail: (res) => {
					console.log(res.errMsg);
				}
			});

		};
			//入党时间
		const rudangConfirm = (e:any) => {
			const date = new Date(e.value);
			partytime.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
			rudangshow.value = false;
		};
			//参加工作时间获取
		const handleConfirm = (e:any) => {
			const date = new Date(e.value);
			chooseworktime.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
			show.value = false;
		};
			//退休日期获取
		const endConfirm = (e:any) => {
			const date = new Date(e.value);
			chooseretairtime.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
			endshow.value = false;
		};
			//提交
		const tijiaoClick = () => {
				
			if ( name.value.length == 0) {
				
				uni.showToast({
					title:'请填写户主姓名',
					icon:'none'
				});
				return;
			}
			if ( nation.value.length == 0) {
				
				uni.showToast({
					title:'请填写民族',
					icon:'none'
				});
				return;
			}
			if ( idCard.value.length == 0) {
				
				uni.showToast({
					title:'请填写身份证号码',
					icon:'none'
				});
				return;
			}
			if ( phone.value.length == 0) {
				
				uni.showToast({
					title:'请填写联系电话',
					icon:'none'
				});
				return;
			}
			
			if ( isedit.value === '0') {
				
				 finalTiJiaoData();
				
			}else if( isedit.value === '1'){
				
				 updateData();
			}
		};
		const finalTiJiaoData = async() => {
				
			try {
				
				let param = {
					
					userId:getStorage(storageKeys.userId,''),
					type:'0',//添加类型，0是户主1是成员
					houseid: house_id.value,
					name: name.value,
					nationality: nation.value,
					hometown: hometown.value,
					relationship: relationShip.value,
					id_card: idCard.value,
					census: registeredResidence.value,
					long_live: long_live.value,
					pet: pet.value,
					mobile: phone.value,
					marital_status: maritalstatus.value,
					political_status: politicalstatus.value,
					party_time: partytime.value,
					party_branch: partybranch.value,
					religion: religion.value,
					social_ssistance: socialssistance.value,
					soldier: choosesoldier.value,
					work: work.value,
					join_work: chooseworktime.value,
					retired: chooseretairtime.value,
					specialty: specialty.value,
				};
				const res = await MinePartyWangGeMessageAddMainKeeper(param);
								
				console.log(res);
				uni.navigateBack();
					
				
			}catch (error) {
				console.log(error)
			}
		};
		const updateData = async() => {
				
				try {
				    
					let param = {
						
						id: house_id.value,
						userId:getStorage(storageKeys.userId,''),
						type:'0',//添加类型，0是户主1是成员
						// houseid: house_id,
						name: name.value,
						nationality: nation.value,
						hometown: hometown.value,
						relationship: relationShip.value,
						id_card: idCard.value,
						census: registeredResidence.value,
						long_live: long_live.value,
						pet: pet.value,
						mobile: phone.value,
						marital_status: maritalstatus.value,
						political_status: politicalstatus.value,
						party_time: partytime.value,
						party_branch: partybranch.value,
						religion: religion.value,
						social_ssistance: socialssistance.value,
						soldier: choosesoldier.value,
						work: work.value,
						join_work: chooseworktime.value,
						retired: chooseretairtime.value,
						specialty: specialty.value,
					};
				    const res = await MinePartyWangGeMessageEditKeeperInfo(param);
				                    
				    console.log(res);
					uni.navigateBack();
						
				    
				}catch (error) {
				    console.log(error)
				}
			};
            const goBack = () => {
            
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .formView{
	      display: flex;
	 	 flex-direction: row;
	 	 width: 100%;
	 	 height: 40px;
	 	 background-color: white;
	 	 margin-top: 10px;
	 	 
	 }
	 .searchlocation{
	          margin-left: 15px;
	          width: 230px;
	          height: 30px;
	          margin-top: 10px;
	          font-size: 13px;
	 }
	 .housetypeChoose{
	 	display: grid;
	 	grid-template-columns: repeat(2, 1fr); /* 两列 */
	 	grid-gap: 10px; /* 间距 */
	 	margin-left: 15px;
	 	margin-top: 5px;
	 	
	 }
	 .textAreaView{
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 height: 100px;
		 border: lightgray 1px solid;
		 font-size: 13px;
	 }
	 .startView{
	 		 margin-left: 15px;
	 		 margin-top: 15px;
	 		 width: 200px;
	 		 font-size: 13px;
	 }
	 .endView{
	 		 
	 		 margin-top: 15px;
	 		 width: 200px;
			 font-size: 13px;
			 margin-left: 15px;
	 }
	  .buttonView{
	               
	              margin-top: 40px;
	              background-color: #2A9595;
	              border-radius: 5px;
	              color: white;
	              font-size: 14px;
	              margin-left: 5%; 
	              display: flex;
	              justify-content: center; /* 水平居中 */
	              align-items: center;     /* 垂直居中 */
	              height: 40px;           /* 需要设置高度 */
	              width: 90%;             /* 需要设置宽度 */
				  margin-bottom: 30px;
	     }

    }
</style>