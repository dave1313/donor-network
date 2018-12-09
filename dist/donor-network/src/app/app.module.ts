/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { DonationComponent } from './Donation/Donation.component';

import { DonatorComponent } from './Donator/Donator.component';
import { CharityOrgComponent } from './CharityOrg/CharityOrg.component';
import { CampaignComponent } from './Campaign/Campaign.component';
import { RegulatorComponent } from './Regulator/Regulator.component';

import { ChangeDonationValueComponent } from './ChangeDonationValue/ChangeDonationValue.component';
import { ChangeCampaignComponent } from './ChangeCampaign/ChangeCampaign.component';
import { BuyAidItemComponent } from './BuyAidItem/BuyAidItem.component';
import { SetupEnvComponent } from './SetupEnv/SetupEnv.component';
import { InfoComponent } from './info/info.component';

// DG Import Filter Function
import {FilterAssetPipe} from './Donation/FilterAsset.pipe';


  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DonationComponent,
    DonatorComponent,
    CharityOrgComponent,
    CampaignComponent,
    RegulatorComponent,
    ChangeDonationValueComponent,
    ChangeCampaignComponent,
    BuyAidItemComponent,
    SetupEnvComponent,
   // DG Import Filter Function
    FilterAssetPipe,
    
    InfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
