/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define([],
    
    () => {

        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

            // Default Tax Schedule ahead of load. Avalara will be handling all tax calls.
            try {

                // Tax Schedules
                const defaultTaxSchedule = 1

                scriptContext.newRecord.setValue({
                    fieldId: 'taxschedule'
                    , value: defaultTaxSchedule
                })

            }

            catch (e) {

                log.debug('Error Occured During Before Load', 'Error Occured setting Default Tax Schedule on Item Id ' + scriptContext.newRecord.id)

            }


        }


        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

            try {

                // Confirm accepted triggers
                var eventTypes = ['edit', 'create']
                if (!eventTypes.includes(scriptContext.type)) {return}

                var record = scriptContext.newRecord


                /**
                 * Below we set the values for each list be used in the script, including: 
                 * 
                 * - SKU Category
                 * - POB Assignment
                 * 
                 */

                // SKU Category Definitions
                const inventory3rdPartySoftwareOneTime = 8
                const inventory3rdPartySoftwareTerm = 7
                const inventoryNonSerializedHardware = 6
                const inventorySerializedHardware = 5
                const kitEquipment = 1
                const kitBaseBoxEquipment = 28
                const kitHardwareBundle = 2
                const kitSaaSBundle = 3
                const SKUkitVirtualHWBundle = 4
                const msspBRFirmware = 18
                const msspEquipment = 17
                const msspPrePayPoints = 20
                const msspVirtualHardware = 19
                const softwareBandedTerm = 11
                const softwareOneTime = 12
                const softwareTerm = 10
                const subscriptionHWEquipment = 13
                const subscriptionHWLicense = 14
                const subscriptionVirtualHWLicense = 27
                const subscriptionVirtualHWEquipment = 26
                const subscriptionSaaSBandedSKU = 16
                const subscriptionSaaSProvisioningSKU = 15
                const virtualHardware = 9
                const discountRebate = 23
                const softwareTermInitial = 29
                const softwareBandedTermInitial = 30
                const other = 24
                const serializedWifiApplicance = 34
                const revRecBaseBoxSoftware = 38
                const revRecBaseBoxAppliance = 29
                const kitBaseBoxAppliance = 28
                const kitSoftwareTermBaseBoxActivation = 30

                // POB Category Definitions
                const hardware = 4
                const kitHWBundle = 5
                const kitHWEquipment = 25
                const kitMSSP = 8
                const kitSaaSBundle1Year = 6
                const kitSaaSBundle3Year = 25
                const kitSubscriptionHW = 23
                const POBkitVirtualHWBundle = 7
                const pointsConsumption = 10
                const pointsPurchase = 9
                const softwareAuthPoint1Year = 13
                const softwareAuthPoint3Year = 14
                const softwareEndpoint1Year = 2
                const softwareEndpoint3Year = 3
                const softwareNetSec1Year = 11
                const softwareNetSec2Year = 16
                const softwareNetSec3Year = 12
                const softwareNetSec30Days = 15
                const softwareNetSec5year = 17
                const softwareNetSec6Year = 18
                const softwareNetSec7Year = 19
                const softwareNoTerm = 1
                const softwareWifi1Year = 20
                const softwareWifi3Year = 21
                const softwareWifi5Year = 22
                const subscriptionSoftware = 24

                // Income Accounts
                const productRevenueInvoices41100 = 484
                const serviceRevenueInvoices42100 = 486
                const deferredPointsConsumptions25520 = 467
                const kitRevenue41199 = 1201
                
                // Deferred Revenue Accounts
                const deferredHardwareRevenue25198 = 1306
                const deferredServiceRevenueInvoices25100 = 217
                const deferredHardwareSubscriptionRevenue25299 = 1307
                const deferredSaaSSubscriptionRevenue25399 = 1308
                const deferredKitRevenue25199 = 1202

                // COGS Accounts
                const COGSBOMProduct51010 = 517
                const royalitiesServices52100 = 811
                
                // Asset Accounts
                const inventoryFinishedGoods12010 = 211
                const inventory3rdPartySoftware12050 = 1309

                // Revenue Recognition Rules
                const uponFulfillment = 3
                const ratable1YearPlus7Days = 15
                const ratable3YearPlus7Days = 20
                const ratable1YearPlus16Days = 16
                const ratable3YearPlus16Days = 21
                const ratable30DaysPlus52Days = 27
                const ratable1YearPlus52Days = 17
                const ratable2YearPlus52Days = 19
                const ratable3YearPlus52Days = 22
                const ratable5YearPlus52Days = 24
                const ratable6YearPlus52Days = 25
                const ratable7YearPlus52Days = 26
                const ratable1YearPlus59Days = 18
                const ratable3YearPlus59Days = 23
                const ratable5YearPlus59Days = 29
                const zabRatable = 4
                const raDate = 6
                const ratable1Year = 8
                const ratable3Year = 10
                const ratable30Days = 14
                const ratable2Year = 9
                const ratable5Year = 11
                const ratable6Year = 12
                const ratable7Year = 13
                const zabRatableSoftware = 5


                // Create Revenue Plans On
                const fulfillmentAndDate = 6
                const zabRACreation = 1
                const fulfillment = -3

                // Tax Schedules
                const defaultTaxSchedule = 1

                // Subsidiary
                const wgTechnologiesInc = 2

                // Inherit Charge Schedule From
                const inheritSubscription = 1

                // Default ZAB Term
                const zabTermMonths = 3

                // Default ZAB Rate Type
                const zabRateTypeFixed = 1
                const zabRateTypeUsage = 2

                // Default ZAB Rate Plan
                const zabRatePlanSaaSCount = 3

                // Default ZAB Proration
                const doNotProrate = 3

                // Default Revenue Type
                const inheritFromItem = 3

                // Revenue Type
                const revenueTypeActual = 1

                // Item Sub Type
                


                // Come back to the first one . . ..

                // Retrieve Record Fields to Be Used for Conditional Validation
                var skuCategory = record.getValue({
                    fieldId: 'custitem_wg_sku_category'
                })
                log.debug('SKU Category', skuCategory)

                var pobAssignment = record.getValue({
                    fieldId: 'custitem_wg_pob_assignment'
                })
                log.debug('POB Assignment', pobAssignment)
                
                var activatableSKU = record.getValue({
                    fieldId: 'custitem_activatable_sku'
                })
                log.debug('Activatable SKU', activatableSKU)

                var recordType = record.type
                log.debug('Record Type', recordType)

                var itemSubType = scriptContext.newRecord.getValue({fieldId: 'subtype'})
                log.debug('Item Sub Type', itemSubType)

                // Conditional IF Statements based on above lists and record fields

                if ((['serializedinventoryitem', 'inventoryitem', 'kititem'].includes(recordType)) || (['noninventoryitem', 'serviceitem'].includes(recordType) && ['Sale'].includes(itemSubType))) {

                    record.setValue({
                        fieldId: 'taxschedule'
                        , value: defaultTaxSchedule
                    })

                    record.setValue({
                        fieldId: 'subsidiary'
                        , value: wgTechnologiesInc
                    })

                    if (!(skuCategory == other || skuCategory == discountRebate)) {

                        record.setValue({
                            fieldId: 'isfulfillable'
                            , value: true
                        })

                    }



                }

                if ((recordType == 'serializedinventoryitem' && [inventorySerializedHardware, serializedWifiApplicance].includes(Number(skuCategory))) || (recordType == 'inventoryitem' && [inventoryNonSerializedHardware].includes(Number(skuCategory)))) {

                    record.setValue({
                        fieldId: 'incomeaccount'
                        , value: productRevenueInvoices41100
                    })

                    record.setValue({
                        fieldId: 'deferredrevenueaccount'
                        , value: deferredHardwareRevenue25198
                    })

                    record.setValue({
                        fieldId: 'cogsaccount'
                        , value: COGSBOMProduct51010
                    })

                    record.setValue({
                        fieldId: 'assetaccount'
                        , value: inventoryFinishedGoods12010
                    })

                    record.setValue({
                        fieldId: 'usebins'
                        , value: true
                    })

                    record.setValue({
                        fieldId: 'custitem_wmsse_mix_item'
                        , value: true
                    })

                }

                if (recordType == 'serializedinventoryitem' && [inventory3rdPartySoftwareTerm, inventory3rdPartySoftwareOneTime].includes(Number(skuCategory))) {

                    record.setValue({
                        fieldId: 'incomeaccount'
                        , value: serviceRevenueInvoices42100
                    })

                    record.setValue({
                        fieldId: 'deferredrevenueaccount'
                        , value: deferredServiceRevenueInvoices25100
                    })

                    record.setValue({
                        fieldId: 'cogsaccount'
                        , value: royalitiesServices52100
                    })

                    record.setValue({
                        fieldId: 'assetaccount'
                        , value: inventory3rdPartySoftware12050
                    })

                    record.setValue({
                        fieldId: 'usebins'
                        , value: false
                    })

                    record.setValue({
                        fieldId: 'custitem_wmsse_mix_item'
                        , value: false
                    })

                }



                if ((recordType == 'noninventoryitem' && [virtualHardware, revRecBaseBoxAppliance].includes(Number(skuCategory)) && ['Sale'].includes(itemSubType)) || (recordType == 'serviceitem' && [msspBRFirmware, msspVirtualHardware].includes(Number(skuCategory)) && ['Sale'].includes(itemSubType))) {

                    record.setValue({
                        fieldId: 'incomeaccount'
                        , value: productRevenueInvoices41100
                    })

                    record.setValue({
                        fieldId: 'deferredrevenueaccount'
                        , value: deferredHardwareRevenue25198
                    })

                }

               if ((recordType == 'serviceitem' && [softwareTerm, softwareBandedTerm, softwareOneTime, softwareTermInitial, softwareBandedTermInitial].includes(Number(skuCategory)) && ['Sale'].includes(itemSubType))
                    || (recordType == 'noninventoryitem' && [revRecBaseBoxSoftware].includes(Number(skuCategory)) && ['Sale'].includes(itemSubType))) {

                    record.setValue({
                        fieldId: 'incomeaccount'
                        , value: serviceRevenueInvoices42100
                    })

                    record.setValue({
                        fieldId: 'deferredrevenueaccount'
                        , value: deferredServiceRevenueInvoices25100
                    })

                }

                if (recordType == 'serviceitem' && [subscriptionHWLicense, subscriptionVirtualHWLicense].includes(Number(skuCategory)) && ['Sale'].includes(itemSubType)) {

                    record.setValue({
                        fieldId: 'incomeaccount'
                        , value: serviceRevenueInvoices42100
                    })

                    record.setValue({
                        fieldId: 'deferredrevenueaccount'
                        , value: deferredHardwareSubscriptionRevenue25299
                    })

                    record.setValue({
                        fieldId: 'custitemzab_default_inhrt_chrg_sched'
                        , value: inheritSubscription
                    })

                    record.setValue({
                        fieldId: 'custitemzab_default_term'
                        , value: zabTermMonths
                    })

                    record.setValue({
                        fieldId: 'custitemzab_default_rating_bill_in_arr'
                        , value: true
                    })

                    record.setValue({
                        fieldId: 'custitemzab_default_rate_type'
                        , value: zabRateTypeFixed
                    })
                    
                    record.setValue({
                        fieldId: 'custitemzab_default_proration_type'
                        , value: doNotProrate
                    })

                    record.setValue({
                        fieldId: 'custitemzab_default_revenue_type'
                        , value: inheritFromItem
                    })

                    record.setValue({
                        fieldId: 'custitemzab_revenue_type'
                        , value: revenueTypeActual
                    })
                }

                if (recordType == 'serviceitem' && [subscriptionSaaSProvisioningSKU].includes(Number(skuCategory)) && ['Sale'].includes(itemSubType)) {

                    record.setValue({
                        fieldId: 'incomeaccount'
                        , value: serviceRevenueInvoices42100
                    })

                    record.setValue({
                        fieldId: 'deferredrevenueaccount'
                        , value: deferredSaaSSubscriptionRevenue25399
                    })

                    record.setValue({
                        fieldId: 'custitemzab_default_inhrt_chrg_sched'
                        , value: inheritSubscription
                    })

                    record.setValue({
                        fieldId: 'custitemzab_default_term'
                        , value: zabTermMonths
                    })

                    record.setValue({
                        fieldId: 'custitemzab_default_rating_bill_in_arr'
                        , value: true
                    })

                    record.setValue({
                        fieldId: 'custitemzab_default_rate_type'
                        , value: zabRateTypeUsage
                    })

                    record.setValue({
                        fieldId: 'custitemzab_default_rate_plan'
                        , value: zabRatePlanSaaSCount
                    })
                    
                    record.setValue({
                        fieldId: 'custitemzab_default_proration_type'
                        , value: doNotProrate
                    })

                    record.setValue({
                        fieldId: 'custitemzab_default_revenue_type'
                        , value: inheritFromItem
                    })

                    record.setValue({
                        fieldId: 'custitemzab_revenue_type'
                        , value: revenueTypeActual
                    })

                }

                if (recordType == 'serviceitem' && [msspPrePayPoints].includes(Number(skuCategory)) && ['Sale'].includes(itemSubType)) {

                    record.setValue({
                        fieldId: 'incomeaccount'
                        , value: deferredPointsConsumptions25520
                    })

                    record.setValue({
                        fieldId: 'deferredrevenueaccount'
                        , value: deferredPointsConsumptions25520
                    })

                }

                if (recordType == 'kititem' && [kitEquipment, kitHardwareBundle, kitSaaSBundle, SKUkitVirtualHWBundle, msspEquipment, kitBaseBoxEquipment, kitBaseBoxAppliance, kitSoftwareTermBaseBoxActivation].includes(Number(skuCategory))) {

                    record.setValue({
                        fieldId: 'incomeaccount'
                        , value: kitRevenue41199
                    })

                    record.setValue({
                        fieldId: 'deferredrevenueaccount'
                        , value: deferredKitRevenue25199
                    })

                }

                if (recordType == 'kititem' && [subscriptionHWEquipment, subscriptionVirtualHWEquipment].includes(Number(skuCategory))) {

                    record.setValue({
                        fieldId: 'incomeaccount'
                        , value: kitRevenue41199
                    })

                    record.setValue({
                        fieldId: 'deferredrevenueaccount'
                        , value: deferredHardwareSubscriptionRevenue25299
                    })

                }

                if (recordType == 'kititem' && [discountRebate].includes(Number(skuCategory))) {

                    record.setValue({
                        fieldId: 'vsoesopgroup'
                        , value: 'EXCLUDE'
                    })

                }

                if ([hardware, softwareNoTerm, pointsPurchase].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: uponFulfillment
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: raDate
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillment
                    })

                }
                
                if ([hardware, softwareNoTerm, pointsPurchase].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: uponFulfillment
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: raDate
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillment
                    })

                }

                if ([softwareEndpoint1Year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable1YearPlus7Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable1Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                if ([softwareEndpoint3Year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable3YearPlus7Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable3Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                if ([softwareAuthPoint1Year, kitSaaSBundle1Year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable1YearPlus16Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable1Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                if ([softwareAuthPoint3Year, kitSaaSBundle3Year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable3YearPlus16Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable3Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                if ([softwareNetSec30Days].includes(Number(pobAssignment))) {

                    log.debug('enter', 'entered')

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable30DaysPlus52Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable30Days
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                if ([softwareNetSec1Year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable1YearPlus52Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable1Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                if ([softwareNetSec2Year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable2YearPlus52Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable2Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                if ([softwareNetSec3Year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable3YearPlus52Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable3Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                if ([softwareNetSec5year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable5YearPlus52Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable5Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }
                
                if ([softwareNetSec6Year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable6YearPlus52Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable6Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                
                if ([softwareNetSec7Year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable7YearPlus52Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable7Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                
                if ([softwareWifi1Year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable1YearPlus59Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable1Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                
                if ([softwareWifi3Year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable3YearPlus59Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable3Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                
                if ([softwareWifi5Year].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: ratable5YearPlus59Days
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: ratable5Year
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: fulfillmentAndDate
                    })

                }

                
                if ([subscriptionSoftware].includes(Number(pobAssignment))) {

                    record.setValue({
                        fieldId: 'revenuerecognitionrule'
                        , value: zabRatableSoftware
                    })

                    record.setValue({
                        fieldId: 'revrecforecastrule'
                        , value: zabRatable
                    })

                    record.setValue({
                        fieldId: 'createrevenueplanson'
                        , value: zabRACreation
                    })

                }

                if (activatableSKU != '') {
                    
                    record.setValue({
                        fieldId: 'vsoesopgroup'
                        , value: 'EXCLUDE'
                    })

                }
                else {

                    record.setValue({
                        fieldId: 'vsoesopgroup'
                        , value: 'NORMAL'
                    })

                }

                log.debug('Income Account Before . . .', scriptContext.oldRecord.getValue({fieldId: 'incomeaccount'}))
                log.debug('Income Account After . . .', scriptContext.newRecord.getValue({fieldId: 'incomeaccount'}))

                log.debug('DR Rev Account Before . . .', scriptContext.oldRecord.getValue({fieldId: 'deferredrevenueaccount'}))
                log.debug('DR Rev Account After . . .', scriptContext.newRecord.getValue({fieldId: 'deferredrevenueaccount'}))

                log.debug('COGS Account Before . . .', scriptContext.oldRecord.getValue({fieldId: 'cogsaccount'}))
                log.debug('COGS Account After . . .', scriptContext.newRecord.getValue({fieldId: 'cogsaccount'}))
                
                log.debug('Asset Account Before . . .', scriptContext.oldRecord.getValue({fieldId: 'assetaccount'}))
                log.debug('Asset Account After . . .', scriptContext.newRecord.getValue({fieldId: 'assetaccount'}))

                log.debug('Revenue Recognition Rule Before . . .', scriptContext.oldRecord.getValue({fieldId: 'revenuerecognitionrule'}))         
                log.debug('Revenue Recognition Rule After . . .', scriptContext.newRecord.getValue({fieldId: 'revenuerecognitionrule'}))                
       
                log.debug('Rev Rec Forecast Rule Before . . .', scriptContext.oldRecord.getValue({fieldId: 'revrecforecastrule'}))
                log.debug('Rev Rec Forecast Rule After . . .', scriptContext.newRecord.getValue({fieldId: 'revrecforecastrule'}))

                log.debug('Create Rev Plans On Before . . .', scriptContext.oldRecord.getValue({fieldId: 'createrevenueplanson'}))
                log.debug('Create Rev Plans On After . . .', scriptContext.newRecord.getValue({fieldId: 'createrevenueplanson'}))

                log.debug('Allocation Type Before . . .', scriptContext.oldRecord.getValue({fieldId: 'vsoesopgroup'}))
                log.debug('Allocation Type After . . .', scriptContext.newRecord.getValue({fieldId: 'vsoesopgroup'}))


            }

            catch(e) {

                log.debug(e.name, e.message)

            }


        }


        return {beforeLoad, beforeSubmit}

    });
