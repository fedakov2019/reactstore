"use strict";

import React from "react";
import ReactDOM from "react-dom";

import ReportingButton from "./ReportingButton.react";
import ReportingClickableItem from "./ReportingClickableItem.react";

import InFederalPlanInput from "./misc/InFederalPlanInput.react";

class Reporting extends React.Component {
    componentDidMount() {
        $(".collapsible").collapsible({});
    }

    render() {
        return <div>
            <ul className="collapsible popout" data-collapsible="expandable">
                <li style={{ marginBottom: "10px" }}>
                    <div className="collapsible-header" style={{ lineHeight: "3rem" }}><i className="material-icons">filter_drama</i>Входящие счета (поток от территорий)</div>
                    <div className="collapsible-body">
                        <div className="collection" style={{ padding: "5px" }}>
                            <ReportingButton key="form2Federal" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2fForm2Federal" inRole={["mtr"]}>
                                Форма 2 (фед.)
									</ReportingButton>
                            <ReportingButton key="form2FederalV2019" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2fForm2FederalVer2019" inRole={["mtr"]}>
                                Форма 2 (фед.) - версия 2019 г.
                            </ReportingButton>
                            <ReportingButton key="billList" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2fBillList" inRole={["mtr"]}>
                                Журнал реестров (2-я федеральная)
                            </ReportingButton>
                            <ReportingButton key="2kv" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2f2KV" inRole={["mtr"]}>
                                Форма 2КВ (ежемесячная)
                            </ReportingButton>
                            <ReportingButton key="eko" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2fEkoList" inRole={["mtr"]}>
                                ЭКО
                            </ReportingButton>
                            <ReportingButton key="federalMedOrgs" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2fFederalMedOrgs" inRole={["mtr"]}>
                                Объёмы и стоимость по федеральным МО (по датам платёжных поручений)
									</ReportingButton>
                            <ReportingButton key="federalMedOrgsMtrDate" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2fFederalMedOrgsMtrDate" inRole={["mtr"]}>
                                Объёмы и стоимость по федеральным МО (по датам указаний)
									</ReportingButton>
                            <ReportingButton key="federalMedOrgsAllBudgets" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2fFederalMedOrgsAllBudgets" inRole={["mtr"]}>
                                Объёмы и стоимость по федеральным МО (КС+ДС(специализированная МП) - без учёта источников финансирования)
									</ReportingButton>
                            <ReportingClickableItem key="federalMedOrgsInput" reportMountPoint="reportMountPoint" inRole={["mtr"]} onClick={OpenInMedOrgPlanEditor.bind(this)}>
                                Объёмы и стоимость по федеральным МО (ввод плана)
                                    </ReportingClickableItem>
                            <ReportingButton key="federalMedOrgsPlanned" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2fFederalMoney" inRole={["mtr"]}>
                                Объёмы и стоимость по федеральным МО (с планом)
									</ReportingButton>
                            <ReportingButton key="conditionsPayCode" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2fConditionsPayCode" inRole={["mtr", "ofs"]}>
                                Разрез по условиям оказания МП и способам оплаты
									</ReportingButton>
                            <ReportingButton key="conditionsVidForm" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2fConditionsVidForm" inRole={["mtr"]}>
                                Разрез по условиям оказания МП, видам и форме оказания МП
									</ReportingButton>
                            <ReportingButton key="vmpGroups" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2fVMPGroups" inRole={["mtr", "ofs"]}>
                                Счета ВМП в КС, по группам
									</ReportingButton>
                            <ReportingButton key="pgRefuses" reportMountPoint="reportMountPoint" reportPath="InStream%2fStat%2fPGRefuses" inRole={["mtr"]}>
                                Отчёт по отказам (ПГ)
									</ReportingButton>
                            <ReportingButton key="notRegistredBills" reportMountPoint="reportMountPoint" reportPath="InStream%2fServiceReports%2fNotRegistredBills" inRole={["mtr"]}>
                                Незарегистрированные счета
									</ReportingButton>
                            <ReportingButton key="notBuhPayedBills" reportMountPoint="reportMountPoint" reportPath="InStream%2fServiceReports%2fNotBuhPayedBills" inRole={["mtr"]}>
                                Счета с указаниями, без платёжных поручений
                            </ReportingButton>
                            <ReportingButton key="LateBills" reportMountPoint="reportMountPoint" reportPath="InStream%2fServiceReports%2fLateBills" inRole={["mtr"]}>
                                Просроченные реестры
                            </ReportingButton>
                            <ReportingButton key="BillJournal" reportMountPoint="reportMountPoint" reportPath="InStream%2fOther%2fBillJournal" inRole={["mtr"]}>
                                Журнал регистрации
                            </ReportingButton>
                            <ReportingButton key="actionLog" reportMountPoint="reportMountPoint" reportPath="ServiceReports%2fLogViewer" inRole={["admin"]}>
                                Просмотр логов
									</ReportingButton>
                        </div>
                    </div>
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <div className="collapsible-header" style={{ lineHeight: "3rem" }}><i className="material-icons">filter_drama</i>Входящие счета (поток от территорий) - конфиденциальные</div>
                    <div className="collapsible-body">
                        <div className="collection" style={{ padding: "5px" }}>
                            <ReportingButton key="inkFilteredByUslProfile" reportMountPoint="reportMountPoint" reportPath="InStream%2fPersonalLists%2fFilteredByUslOkProfils" inRole={["mtr"]}>
                                Оплаченные счета (фильтр по условиям оказания МП, профилю, дате платёжного поручения)
                            </ReportingButton>
                        </div>
                    </div>
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <div className="collapsible-header" style={{ lineHeight: "3rem" }}><i className="material-icons">place</i>Счета МО</div>
                    <div className="collapsible-body">
                        <div className="collection" style={{ padding: "5px" }}>
                            <ReportingButton key="moAnalysisByMedOrg" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStat%2fAnalysisByMedOrg" inRole={["admin", "mtr"]}>
                                Анализ счетов от МО
                            </ReportingButton>
                            <ReportingButton key="moAnalysisByMedOrgWRefunds" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStat%2fAnalysisByMedOrgWRefunds" inRole={["admin", "mtr"]}>
                                Анализ счетов от МО с удержаниями
                            </ReportingButton>
                            <ReportingButton key="moPayedByCond" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStat%2fPayedByCond" inRole={["admin", "mtr"]}>
                                Оплачено по условиям оказания медицинской помощи
                            </ReportingButton>
                            <ReportingButton key="moVolumes" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStat%2fVolumes" inRole={["admin", "mtr"]}>
                                Объёмы оказания МП
                            </ReportingButton>
                            <ReportingButton key="moOnkoFed" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStat%2fOnkoFed" inRole={["admin", "mtr"]}>
                                Мониторинг онкологических счетов (федеральный)
                            </ReportingButton>
                            <ReportingButton key="moOnkoAntitumor" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStat%2fOnkoAntitumor" inRole={["admin", "mtr"]}>
                                Мониторинг противоопухолевого лечения
                            </ReportingButton>
                            <ReportingButton key="moServiceCrosses" reportMountPoint="reportMountPoint" reportPath="MoStream%2fOther%2fServiceCrosses" inRole={["admin", "mtr"]}>
                                Мониторинг пересечений услуг и счетов КС/ДС направивших МО
                            </ReportingButton>
                            <ReportingButton key="moStatEnvelope" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStatOuter%2fStatEnvelope" inRole={["admin", "mtr"]}>
                                Отчёт по условиям и объёмам (отдел статистики)
                            </ReportingButton>
                            <ReportingButton key="moAnsoLike" reportMountPoint="reportMountPoint" reportPath="MoStream%2fFinDepartment%2fAnsoLike" inRole={["admin", "mtr", "ofs"]}>
                                Отчёт по условиям и объёмам (финанасовый) - без учёта счетов, оплаченных в рамках взаимозачётов с направившей МО
                            </ReportingButton>
                            <ReportingButton key="moEko" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStat%2fEkoList" inRole={["admin", "mtr"]}>
                                ЭКО
                            </ReportingButton>
                            <ReportingButton key="moZpz5" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStat%2fZpz5" inRole={["admin", "mtr"]}>
                                ЗПЗ табл. 5
                            </ReportingButton>
                            <ReportingButton key="moDiagLab" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStat%2fDiagLabSvc" inRole={["admin", "mtr"]}>
                                Диагностические и лабораторные исследования
                            </ReportingButton>
                            <ReportingButton key="moSmpByCustomGroups" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStat%2fSmpByCustomGroups" inRole={["admin", "mtr"]}>
                                СМП анализ
                            </ReportingButton>
                            <ReportingButton key="moSmpAgeResult" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStat%2fSmpAgeResult" inRole={["admin", "mtr"]}>
                                СМП цель-результат-возраст
                            </ReportingButton>
                            <ReportingButton key="moSmpMedOrgAge" reportMountPoint="reportMountPoint" reportPath="MoStream%2fStat%2fSmpMedOrgAge" inRole={["admin", "mtr"]}>
                                СМП МО - возраст
                            </ReportingButton>
                        </div>
                    </div>
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <div className="collapsible-header" style={{ lineHeight: "3rem" }}><i className="material-icons">whatshot</i>Исходящие счета (поток на территории)</div>
                    <div className="collapsible-body">
                        <div className="collection" style={{ padding: "5px" }}>
                            <ReportingButton key="outAnalysisByRegion" reportMountPoint="reportMountPoint" reportPath="OutStream%2fStat%2fAnalysisByRegion" inRole={["admin"]}>
                                Анализ счетов (основных) по территориям
                            </ReportingButton>
                            <ReportingButton key="outAnalysisByMoToTer" reportMountPoint="reportMountPoint" reportPath="OutStream%2fStat%2fAnalysisByRegionToMo" inRole={["admin"]}>
                                Анализ счетов (основных) - разложение оказанной МО помощи по территориям
                            </ReportingButton>
                            <ReportingButton key="outForm2Federal" reportMountPoint="reportMountPoint" reportPath="OutStream%2fStat%2fForm2Federal" inRole={["admin"]}>
                                Форма 2 (фед.)
                            </ReportingButton>
                            <ReportingButton key="outBillList" reportMountPoint="reportMountPoint" reportPath="OutStream%2fStat%2fBillList" inRole={["mtr"]}>
                                Журнал реестров (2-я федеральная)
                            </ReportingButton>
                            <ReportingButton key="outVolumes" reportMountPoint="reportMountPoint" reportPath="OutStream%2fStat%2fVolumes" inRole={["admin", "mtr"]}>
                                Объёмы оказания МП
                            </ReportingButton>
                        </div>
                    </div>
                </li>
            </ul>
            <div id="reportMountPoint"></div>
        </div>;
    }
};

function OpenInMedOrgPlanEditor() {
    ReactDOM.unmountComponentAtNode(document.getElementById("reportMountPoint"));
    ReactDOM.render(<InFederalPlanInput
        id="documentMounted"
        style={{ width: "75vw", maxHeight: "96vh", height: "96vh", top: "2vh" }} mountPoint="reportMountPoint"></InFederalPlanInput>,
        document.getElementById("reportMountPoint"));
    $("#documentMounted").openModal();
}

export default Reporting;