/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * Default values stored on SKU Category and POB Assignment Records
 * @abstract
 * @author Quinn Christensen
 */
define(['N/search'],
    /**
     * @param search
     * @returns
     */
    (search) => {

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

            // Default Tax Schedule ahead of load. Avalara will be handling all tax calls, so the value in this field is negligible but required to submit item record
            // Executing before load so users do not need to populate field and it can be ignored
            try {

                // Tax Schedules
                const defaultTaxSchedule = 1

                scriptContext.newRecord.setValue({
                    fieldId: 'taxschedule'
                    , value: defaultTaxSchedule
                })

                // Need to update the SKU Category && POB Assignment to be uneditable post creation field to be disabled post creation --
                if (scriptContext.type == 'edit') {

                    updateFieldDisplayType(scriptContext.form, 'custitem_wg_sku_category', 'inline')

                }

            }

            catch (e) {

                log.error('Error Occured During Before Load', e)

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

                defaultItemValues(scriptContext)

            }

            catch(e) {

                log.error(e.name, e.message)

            }

        }

        /**
         * Create mappping dictionary of Sku Category and POB Assignment. Update item record ahead of submission.
         * @abstract
         * @namespace defaultItemValues
         * @param {Object} rec - New item record to be submitted to the database
         */
        function defaultItemValues(scriptContext) {

            var rec = scriptContext.newRecord

            // Pull Default Values for SKU Category and POB Assignment
            
            /**
             * Set the Default Values from Mapping
             */

            // Default SKU Category Values
            if (rec.getValue('custitem_wg_sku_category') && scriptContext.type == 'create') {

                /**
                 * SKU Category Mapping:
                 * 
                 * > Income Account
                 *      > SKU Field: custrecord_wg_sku_cat_income_acct
                 *      > Item Field: incomeaccount
                 * > Deferred Revenue Account
                 *      > SKU Field: custrecord_wg_sku_cat_deferred_rev_acct
                 *      > Item Field: deferredrevenueaccount
                 * > Asset Account
                 *      > SKU Field: custrecord_wg_sku_cat_asset_acct
                 *      > Item Field: assetaccount
                 * > COGS Account
                 *      > SKU Field: custrecord_wg_sku_cat_cogs_acct
                 *      > Item Field: cogsaccount
                 * > ZAB Default Rate Type
                 *      > SKU Field: custrecord_wg_sku_cat_zab_rate_type
                 *      > Item Field: custitemzab_default_rate_type
                 * > ZAB Default Rate Plan
                 *      > SKU Field: custrecord_wg_sku_cat_zab_rate_plan
                 *      > Item Field: custitemzab_default_rate_plan
                 * > Inherit Charge Schedule From
                 *      > SKU Field: custrecord_wg_sku_cat_inherit_chg_sched
                 *      > Item Field: custitemzab_default_inhrt_chrg_sched
                 * > Default Bill in Arrears
                 *      > SKU Field: custrecord_wg_sku_cat_bill_in_arrear
                 *      > Item Field: custitemzab_default_bill_in_arrears
                 * > Default Term
                 *      > SKU Field: custrecord_wg_sku_cat_default_term
                 *      > Item Field: custitemzab_default_term
                 * > Default Proration Type
                 *      > SKU Field: custrecord_wg_sku_cat_zab_proration_type
                 *      > Item Field: custitemzab_default_proration_type
                 * > Revenue Type
                 *      > SKU Field: custrecord_wg_sku_cat_default_rev_type
                 *      > Item Field: custitemzab_revenue_type
                 * > Default Revenue Type
                 *      > SKU Field: custrecord_wg_sku_cat_default_rev_type
                 *      > Item Field: custitemzab_default_revenue_type
                 * > Can Be Fulfilled / Received
                 *      > SKU Field: custrecord_wg_sku_cat_fulfillable
                 *      > Item Field: isfulfillable
                 * > Use Bins
                 *      > SKU Field: custrecord_wg_sku_cat_use_bins
                 *      > Item Field: usebins
                 * > WMS Mix Items in Bins
                 *      > SKU Field: custrecord_wg_sku_cat_wms_mixitem_in_bin
                 *      > Item Field: custitem_wmsse_mix_item
                 * > Default Exclude from Billing When
                 *      > SKU Field: custrecord_wg_sku_cat_default_excl_charg
                 *      > Item Field: custitemzab_default_exclude_charges
                 * > Revenue Type
                 *      > SKU Field: custrecord_wg_sku_cat_zab_revenue_type
                 *      > Item Field: custitemzab_revenue_type
                 */
                
                var skuCategoryMapping = {
                    custrecord_wg_sku_cat_income_acct: 'incomeaccount'
                    , custrecord_wg_sku_cat_deferred_rev_acct: 'deferredrevenueaccount'
                    , custrecord_wg_sku_cat_asset_acct: 'assetaccount'
                    , custrecord_wg_sku_cat_cogs_acct: 'cogsaccount'
                    , custrecord_wg_sku_cat_zab_rate_type: 'custitemzab_default_rate_type'
                    , custrecord_wg_sku_cat_zab_rate_plan: 'custitemzab_default_rate_plan'
                    , custrecord_wg_sku_cat_inherit_chg_sched: 'custitemzab_default_inhrt_chrg_sched'
                    , custrecord_wg_sku_cat_bill_in_arrear: 'custitemzab_default_bill_in_arrears'
                    , custrecord_wg_sku_cat_default_term: 'custitemzab_default_term'
                    , custrecord_wg_sku_cat_zab_proration_type: 'custitemzab_default_proration_type'
                    , custrecord_wg_sku_cat_default_rev_type: 'custitemzab_revenue_type'
                    , custrecord_wg_sku_cat_default_rev_type: 'custitemzab_default_revenue_type'
                    , custrecord_wg_sku_cat_fulfillable: 'isfulfillable'
                    , custrecord_wg_sku_cat_use_bins: 'usebins'
                    , custrecord_wg_sku_cat_wms_mixitem_in_bin: 'custitem_wmsse_mix_item'
                    , custrecord_wg_sku_cat_subsidiary: 'subsidiary'
                    , custrecord_wg_sku_cat_include_children: 'includechildren'
                    , custrecord_wg_sku_cat_default_excl_charg: 'custitemzab_default_exclude_charges'
                    , custrecord_wg_sku_cat_zab_revenue_type: 'custitemzab_revenue_type'
                }

                copyMappedFields(skuCategoryMapping, rec, 'customrecord_wg_sku_category', rec.getValue('custitem_wg_sku_category'), 'custrecord_wg_sku_cat_excl_default_value')
            }

            // Default POB Assignment Values
            if (rec.getValue('custitem_wg_pob_assignment') && ['create', 'edit'].includes(scriptContext.type)) {

                /**
                 * POB Assignment Mapping:
                 * 
                 * > Revenue Recognition Rule
                 *      > POB Field: custrecord_wg_pob_rev_rec_rule
                 *      > Item Field: revenuerecognitionrule
                 * > Rev Rec Forecast Rule
                 *      > POB Field: custrecord_wg_pob_rev_rec_forecast_rule
                 *      > Item Field: revrecforecastrule
                 * > Create Revenue Plan On
                 *      > POB Field: custrecord_wg_pob_create_rev_plan_on
                 *      > Item Field: createrevenueplanson
                 * > Item Revenue Category
                 *      > POB Field: custrecord_wg_pob_itemrevenuecategory
                 *      > Item Field: itemrevenuecategory
                 */
                
                var pobAssignmentMapping = {
                    custrecord_wg_pob_rev_rec_rule: 'revenuerecognitionrule'
                    , custrecord_wg_pob_rev_rec_forecast_rule: 'revrecforecastrule'
                    , custrecord_wg_pob_create_rev_plan_on: 'createrevenueplanson'
                    , custrecord_wg_pob_itemrevenuecategory: 'itemrevenuecategory'
                };

                copyMappedFields(pobAssignmentMapping, rec, 'customrecord_wg_pob_assignment', rec.getValue('custitem_wg_pob_assignment'), 'isinactive')
            }

        }

        /**
         * Copy field values based on mapped dictionary.
         * @abstract
         * @namespace copyMappedFields
         * @param {Object} mappedDict - Dictionary mapping to item record.
         * @param {Object} rec - New item record to be submitted to the database.
         * @param {string} recordLookupType - Item record type to be used during lookup fields function.
         * @param {number} recordLookupId - Internal Id of item record.
         * @param {string} exclusionField - field to determine if default values should be set.
         */
        function copyMappedFields(mappedDict, rec, recordLookupType, recordLookupId, exclusionField) {

            var doNotSetDefaultValues = false
            if (exclusionField) {
                // Determine if Excluded
                var lookupExclusion = search.lookupFields({
                    type: recordLookupType
                    , id: recordLookupId
                    , columns: exclusionField
                })

                if (lookupExclusion[exclusionField]) {
                    doNotSetDefaultValues = lookupExclusion[exclusionField]
                }
            }

            if (!doNotSetDefaultValues) {

                // Lookup The Values of Mapped Dict
                var lookupResults = search.lookupFields({
                    type: recordLookupType
                    , id: recordLookupId
                    , columns: Object.keys(mappedDict)
                })
        
                var fieldValue
                for (var key in lookupResults) {
        
                    try {
                        // Validate Lookup Results Values
                        // Determine if results are returned in array to determine handling.
                        if (
                            lookupResults[key]
                            && Array.isArray(lookupResults[key])
                            && lookupResults[key].length == 1
                        ) {
                            fieldValue = lookupResults[key][0].value
                        }
                        else if (
                            lookupResults[key]
                            && Array.isArray(lookupResults[key])
                            && lookupResults[key].length > 1
                        ) {
                            fieldValue = lookupResults[key].map(x => x.value)
                        }
                        else if (
                            !(lookupResults[key] === null || lookupResults[key] === undefined || lookupResults[key] === '')
                            && !Array.isArray(lookupResults[key])
                        ) {
                            fieldValue = lookupResults[key]
                        }
                        else {
                            fieldValue = ''
                        }

                        log.debug('Values To Be Set', `Mapped Field: ${key} 
                                                        --- Field: ${mappedDict[key]} 
                                                        --- Lookup Value: ${JSON.stringify(lookupResults[key])}
                                                        --- Field Value: ${fieldValue}`)

                        rec.setValue({
                            fieldId: mappedDict[key]
                            , value: fieldValue
                        })                                                   

                    }
                    catch(e) {
                        log.error('An Error Occured Defaulting Item Value', e)
                    }
        
                }


            }
    
        }

        /**
         * 
         * @param {Form} form - Current Form Record to Be Updated
         * @param {string} fieldId - Field Id display type to be updated on form
         * @param {string} displayType - Display type to be set on the form
         */
        function updateFieldDisplayType(form, fieldId, displayType) {
            var field = form.getField({id: fieldId})
            field.updateDisplayType({displayType: displayType})
        }

        return {beforeLoad, beforeSubmit}

    });