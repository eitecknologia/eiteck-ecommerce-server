import schedule from "node-schedule";
import { currentDateMounth } from "../helpers/app-helpers";
import { Op } from "sequelize";
import { DiscountCode } from "../models";

// Define the rule
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6]; // Monday to sunday
rule.hour = 1; // 2 am
rule.minute = 30; // Min 0

export const verifyCodesDiscount = () => {
    schedule.scheduleJob(rule, async () => {
        try {

            /* Get current Date */
            const currentDate = currentDateMounth();

            /* Get codes to active */
            const statusDiscountCodes = await DiscountCode.findAll({
                attributes: ["discountcodeid", "startdate", "finishdate", "status"],
                where: {
                    isActive: true,
                    startdate: {
                        [Op.lte]: currentDate
                    },
                    finishdate: {
                        [Op.gte]: currentDate
                    }
                }
            });

            for (const code of statusDiscountCodes) {
                await code.update({
                    status: true
                })
            }

            /* Get codes to desactivate */
            const statusDiscountCodesDesactivate = await DiscountCode.findAll({
                attributes: ["discountcodeid", "startdate", "finishdate", "status"],
                where: {
                    isActive: true,
                    [Op.or]: [
                        {
                            startdate: {
                                [Op.gt]: currentDate
                            }
                        },
                        {
                            finishdate: {
                                [Op.lt]: currentDate
                            }
                        }
                    ]
                }
            });

            for (const code of statusDiscountCodesDesactivate) {
                await code.update({
                    status: false
                })
            }

            return;
        } catch (error) {
            console.log(error);
            return;
        }
    })
}
