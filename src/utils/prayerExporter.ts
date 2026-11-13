import { PrayerRequest, PRAYER_CATEGORIES } from '../types/prayer';

export const exportToWordDocument = (prayers: PrayerRequest[], isTelugu: boolean): void => {
  const pregnancyPrayers = prayers.filter((p) => p.category === 'pregnancy');
  const healthPrayers = prayers.filter((p) => p.category === 'health');
  const otherPrayers = prayers.filter((p) => p.category !== 'pregnancy' && p.category !== 'health');

  const nowFormatted = new Date().toLocaleDateString(isTelugu ? 'te-IN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const generateTableRows = (list: PrayerRequest[]) => {
    if (list.length === 0) {
      return `<tr><td colspan="5" style="text-align:center; padding: 12px; color: #64748b; font-style: italic;">${
        isTelugu ? 'ఈ విభాగంలో విన్నపాలు లేవు' : 'No petitions in this category'
      }</td></tr>`;
    }
    return list
      .map(
        (p, idx) => `
        <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
          <td style="border: 1px solid #cbd5e1; padding: 8px 10px; text-align: center; font-weight: bold; width: 40px;">${
            idx + 1
          }</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px 10px; font-weight: 600; color: #1e293b; width: 140px;">
            ${p.name}
            ${p.phone ? `<br/><span style="font-size: 10px; color: #64748b;">📞 ${p.phone}</span>` : ''}
          </td>
          <td style="border: 1px solid #cbd5e1; padding: 8px 10px; color: #334155; width: 110px;">${p.village}</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px 10px; color: #0f172a;">
            <div style="font-weight: 600; color: #b45309; margin-bottom: 3px;">${p.title}</div>
            <div style="line-height: 1.45; font-size: 11pt;">${p.prayer}</div>
          </td>
          <td style="border: 1px solid #cbd5e1; padding: 8px 10px; text-align: center; color: #475569; width: 90px; font-size: 10pt;">
            ${p.date}
          </td>
        </tr>`
      )
      .join('');
  };

  const htmlContent = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head>
    <meta charset="utf-8">
    <title>${isTelugu ? 'వేమండ జపమాల మాత ప్రార్థనా విన్నపాలు' : 'Vemanda Japamala Matha Prayer Petitions'}</title>
    <!--[if gte mso 9]>
    <xml>
      <w:WordDocument>
        <w:View>Print</w:View>
        <w:Zoom>100</w:Zoom>
        <w:DoNotOptimizeForBrowser/>
      </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
      @page {
        size: A4 portrait;
        margin: 20mm 15mm 20mm 15mm;
      }
      body {
        font-family: 'Gautami', 'Nirmala UI', 'Calibri', 'Arial', sans-serif;
        color: #0f172a;
        background: #ffffff;
        font-size: 11pt;
        line-height: 1.4;
      }
      .header-box {
        text-align: center;
        border-bottom: 3px double #d97706;
        padding-bottom: 12px;
        margin-bottom: 20px;
      }
      .title-main {
        font-size: 18pt;
        font-weight: bold;
        color: #78350f;
        margin: 0;
        padding: 0;
      }
      .title-sub {
        font-size: 12pt;
        font-weight: bold;
        color: #1e3a8a;
        margin-top: 4px;
      }
      .meta-bar {
        margin-top: 8px;
        font-size: 10pt;
        color: #475569;
      }
      .stats-table {
        width: 100%;
        margin-bottom: 20px;
        border-collapse: collapse;
      }
      .stats-cell {
        border: 1px solid #e2e8f0;
        padding: 8px 12px;
        text-align: center;
        background-color: #f8fafc;
      }
      .stats-val {
        font-size: 14pt;
        font-weight: bold;
      }
      .section-heading {
        padding: 8px 12px;
        margin-top: 24px;
        margin-bottom: 8px;
        font-size: 13pt;
        font-weight: bold;
        border-radius: 4px;
      }
      .section-pregnancy {
        background-color: #ffe4e6;
        color: #9f1239;
        border-left: 6px solid #e11d48;
      }
      .section-health {
        background-color: #d1fae5;
        color: #065f46;
        border-left: 6px solid #059669;
      }
      .section-other {
        background-color: #f1f5f9;
        color: #1e293b;
        border-left: 6px solid #64748b;
      }
      table.petitions-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 15px;
      }
      th {
        border: 1px solid #cbd5e1;
        padding: 8px 10px;
        background-color: #f1f5f9;
        color: #0f172a;
        font-size: 10pt;
        text-align: left;
      }
      .footer-note {
        margin-top: 30px;
        border-top: 1px solid #cbd5e1;
        padding-top: 10px;
        font-size: 9.5pt;
        color: #64748b;
        text-align: center;
        font-style: italic;
      }
    </style>
  </head>
  <body>
    <div class="header-box">
      <div class="title-main">
        ${isTelugu ? 'వేమండ జపమాల మాత క్షేత్ర వార్షిక మహోత్సవాలు' : 'Vemanda Japamala Matha Shrine - Annual Feast'}
      </div>
      <div class="title-sub">
        ${
          isTelugu
            ? 'దివ్యబలిపూజ & తేరు ప్రదక్షిణ కొరకు భక్తుల ప్రార్థనా విన్నపాల పత్రం'
            : 'Devotee Prayer Petitions for Holy Mass & Sacred Processions'
        }
      </div>
      <div class="meta-bar">
        <span>📍 ${isTelugu ? 'వేమండ గ్రామము, వెంట్రప్రగడ విచారణ' : 'Vemanda Village, Ventrapragada Parish'}</span> | 
        <span>🗓️ ${isTelugu ? 'అక్టోబర్ 27-30 మహోత్సవాలు' : 'October 27-30 Feast'}</span> | 
        <span>📄 ${isTelugu ? `పత్రం ముద్రించిన తేది: ${nowFormatted}` : `Document Generated: ${nowFormatted}`}</span>
      </div>
    </div>

    <!-- Summary Statistics -->
    <table class="stats-table">
      <tr>
        <td class="stats-cell" style="background-color: #fff1f2;">
          <div style="color: #9f1239; font-size: 10pt; font-weight: 600;">
            🤰 ${isTelugu ? 'సంతాన భాగ్యం & సుఖ ప్రసవం' : 'Pregnancy & Childbirth'}
          </div>
          <div class="stats-val" style="color: #e11d48;">${pregnancyPrayers.length}</div>
        </td>
        <td class="stats-cell" style="background-color: #ecfdf5;">
          <div style="color: #065f46; font-size: 10pt; font-weight: 600;">
            🩺 ${isTelugu ? 'ఆరోగ్యం & స్వస్థత ప్రార్థనలు' : 'Health & Healing'}
          </div>
          <div class="stats-val" style="color: #059669;">${healthPrayers.length}</div>
        </td>
        <td class="stats-cell" style="background-color: #eff6ff;">
          <div style="color: #1e40af; font-size: 10pt; font-weight: 600;">
            🕊️ ${isTelugu ? 'కుటుంబ & ఇతర విన్నపాలు' : 'Family & Other Intentions'}
          </div>
          <div class="stats-val" style="color: #2563eb;">${otherPrayers.length}</div>
        </td>
        <td class="stats-cell" style="background-color: #fefce8;">
          <div style="color: #854d0e; font-size: 10pt; font-weight: 600;">
            🙏 ${isTelugu ? 'మొత్తం ప్రార్థనా విన్నపాలు' : 'Total Devotee Petitions'}
          </div>
          <div class="stats-val" style="color: #d97706;">${prayers.length}</div>
        </td>
      </tr>
    </table>

    <!-- SECTION 1: PREGNANCY & CHILDBIRTH (HIGHLIGHTED) -->
    <div class="section-heading section-pregnancy">
      🤰 1. ${
        isTelugu
          ? 'సంతాన భాగ్యం, గర్భిణీ స్త్రీల క్షేమం & సుఖ ప్రసవ ప్రార్థనలు (Pregnancy & Childbirth Intentions)'
          : 'Pregnancy, Safe Delivery & Blessing of Children Intentions'
      }
      <span style="font-size: 10pt; font-weight: normal; margin-left: 10px;">[${pregnancyPrayers.length} ${
    isTelugu ? 'విన్నపాలు' : 'Petitions'
  }]</span>
    </div>
    <table class="petitions-table">
      <thead>
        <tr>
          <th style="width: 40px; text-align: center;">${isTelugu ? 'క్ర.సం' : 'S.No'}</th>
          <th style="width: 140px;">${isTelugu ? 'భక్తుని పేరు' : 'Devotee Name'}</th>
          <th style="width: 110px;">${isTelugu ? 'గ్రామం / ఊరు' : 'Village / Place'}</th>
          <th>${isTelugu ? 'ప్రార్థనా విన్నపం వివరాలు' : 'Prayer Intention Details'}</th>
          <th style="width: 90px; text-align: center;">${isTelugu ? 'తేది' : 'Date'}</th>
        </tr>
      </thead>
      <tbody>
        ${generateTableRows(pregnancyPrayers)}
      </tbody>
    </table>

    <!-- SECTION 2: HEALTH & HEALING (HIGHLIGHTED) -->
    <div class="section-heading section-health">
      🩺 2. ${
        isTelugu
          ? 'శారీరక రోగ నివారణ, శస్త్రచికిత్సలు & సంపూర్ణ స్వస్థత ప్రార్థనలు (Health & Healing Intentions)'
          : 'Health, Severe Illness Relief & Healing Petitions'
      }
      <span style="font-size: 10pt; font-weight: normal; margin-left: 10px;">[${healthPrayers.length} ${
    isTelugu ? 'విన్నపాలు' : 'Petitions'
  }]</span>
    </div>
    <table class="petitions-table">
      <thead>
        <tr>
          <th style="width: 40px; text-align: center;">${isTelugu ? 'క్ర.సం' : 'S.No'}</th>
          <th style="width: 140px;">${isTelugu ? 'భక్తుని పేరు' : 'Devotee Name'}</th>
          <th style="width: 110px;">${isTelugu ? 'గ్రామం / ఊరు' : 'Village / Place'}</th>
          <th>${isTelugu ? 'ప్రార్థనా విన్నపం వివరాలు' : 'Prayer Intention Details'}</th>
          <th style="width: 90px; text-align: center;">${isTelugu ? 'తేది' : 'Date'}</th>
        </tr>
      </thead>
      <tbody>
        ${generateTableRows(healthPrayers)}
      </tbody>
    </table>

    <!-- SECTION 3: OTHER PETITIONS -->
    <div class="section-heading section-other">
      🕊️ 3. ${
        isTelugu
          ? 'కుటుంబ శాంతి, కృతజ్ఞతా స్తుతులు & ఇతర ప్రత్యేక విన్నపాలు (Family, Thanksgiving & Special)'
          : 'Family Unity, Thanksgiving & Special Petitions'
      }
      <span style="font-size: 10pt; font-weight: normal; margin-left: 10px;">[${otherPrayers.length} ${
    isTelugu ? 'విన్నపాలు' : 'Petitions'
  }]</span>
    </div>
    <table class="petitions-table">
      <thead>
        <tr>
          <th style="width: 40px; text-align: center;">${isTelugu ? 'క్ర.సం' : 'S.No'}</th>
          <th style="width: 140px;">${isTelugu ? 'భక్తుని పేరు' : 'Devotee Name'}</th>
          <th style="width: 110px;">${isTelugu ? 'గ్రామం / ఊరు' : 'Village / Place'}</th>
          <th>${isTelugu ? 'ప్రార్థనా విన్నపం వివరాలు' : 'Prayer Intention Details'}</th>
          <th style="width: 90px; text-align: center;">${isTelugu ? 'తేది' : 'Date'}</th>
        </tr>
      </thead>
      <tbody>
        ${generateTableRows(otherPrayers)}
      </tbody>
    </table>

    <div class="footer-note">
      ${
        isTelugu
          ? 'ఈ పవిత్ర ప్రార్థనా విన్నపాలు వేమండ జపమాల మాత క్షేత్ర వార్షిక మహోత్సవాల సమిష్టి దివ్యబలిపూజలలో మరియు పవిత్ర తేరు రథోత్సవంలో మరియమాత పాదాల చెంత సమర్పించబడును.'
          : 'These prayer petitions are reverently offered at the feet of Our Lady of the Rosary during the Feast Holy Masses and Sacred Processions at Vemanda Shrine.'
      }
    </div>
  </body>
  </html>`;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Vemanda_Japamala_Matha_Prayers_${Date.now()}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (prayers: PrayerRequest[], isTelugu: boolean): void => {
  const headers = isTelugu
    ? ['క్రమ సంఖ్య', 'భక్తుని పేరు', 'గ్రామం/ప్రాంతం', 'ఫోన్ నంబర్', 'వర్గం', 'శీర్షిక', 'ప్రార్థనా విన్నపం', 'తేది', 'ఆమెన్ల సంఖ్య']
    : ['S.No', 'Devotee Name', 'Village/Place', 'Phone', 'Category', 'Title', 'Prayer Intention', 'Date', 'Amens Count'];

  const rows = prayers.map((p, index) => {
    const catMeta = PRAYER_CATEGORIES[p.category];
    const catLabel = isTelugu ? catMeta.labelTe : catMeta.labelEn;
    const cleanText = (text: string) => `"${(text || '').replace(/"/g, '""')}"`;

    return [
      index + 1,
      cleanText(p.name),
      cleanText(p.village),
      cleanText(p.phone || '-'),
      cleanText(catLabel),
      cleanText(p.title),
      cleanText(p.prayer),
      cleanText(p.date),
      p.amenCount,
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Vemanda_Prayer_Petitions_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const printPrayerDocument = (prayers: PrayerRequest[], isTelugu: boolean): void => {
  const pregnancyPrayers = prayers.filter((p) => p.category === 'pregnancy');
  const healthPrayers = prayers.filter((p) => p.category === 'health');
  const otherPrayers = prayers.filter((p) => p.category !== 'pregnancy' && p.category !== 'health');

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert(isTelugu ? 'ప్రింట్ విండో తెరవడంలో విఫలమైంది. దయచేసి పాపప్‌లను అనుమతించండి.' : 'Pop-up blocked. Please allow pop-ups to print/save document.');
    return;
  }

  const generatePrintRows = (list: PrayerRequest[]) => {
    if (list.length === 0) {
      return `<tr><td colspan="5" style="text-align:center; padding: 12px; color: #64748b;">${
        isTelugu ? 'ఈ విభాగంలో విన్నపాలు లేవు' : 'No petitions in this category'
      }</td></tr>`;
    }
    return list
      .map(
        (p, idx) => `
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; font-weight: bold;">${idx + 1}</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold;">
          ${p.name}
          ${p.phone ? `<div style="font-size: 10px; color: #64748b;">📞 ${p.phone}</div>` : ''}
        </td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">${p.village}</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">
          <div style="font-weight: bold; color: #b45309;">${p.title}</div>
          <div style="font-size: 11pt; margin-top: 4px;">${p.prayer}</div>
        </td>
        <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center; font-size: 10pt;">${p.date}</td>
      </tr>`
      )
      .join('');
  };

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${isTelugu ? 'వేమండ జపమాల మాత ప్రార్థనా పత్రం' : 'Vemanda Prayers Document'}</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body { font-family: sans-serif; color: #0f172a; margin: 0; padding: 10px; font-size: 11pt; }
          .header { text-align: center; border-bottom: 2px solid #d97706; padding-bottom: 10px; margin-bottom: 16px; }
          .h1 { font-size: 18pt; font-weight: bold; color: #78350f; }
          .h2 { font-size: 13pt; color: #1e3a8a; margin-top: 4px; }
          .section-title { font-size: 13pt; font-weight: bold; padding: 6px 10px; margin: 16px 0 6px 0; border-radius: 4px; }
          .sec-preg { background: #ffe4e6; color: #9f1239; border-left: 5px solid #e11d48; }
          .sec-health { background: #d1fae5; color: #065f46; border-left: 5px solid #059669; }
          .sec-other { background: #f1f5f9; color: #1e293b; border-left: 5px solid #64748b; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
          th { border: 1px solid #cbd5e1; padding: 8px; background: #f8fafc; font-size: 10pt; text-align: left; }
          .footer { text-align: center; font-size: 10pt; color: #64748b; margin-top: 24px; border-top: 1px solid #cbd5e1; padding-top: 8px; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="h1">${isTelugu ? 'వేమండ జపమాల మాత క్షేత్ర వార్షిక మహోత్సవాలు' : 'Vemanda Japamala Matha Shrine - Annual Feast'}</div>
          <div class="h2">${isTelugu ? 'దివ్యబలిపూజ ప్రార్థనా విన్నపాలు (మొత్తం: ' + prayers.length + ')' : 'Holy Mass Prayer Petitions (Total: ' + prayers.length + ')'}</div>
        </div>

        <div class="section-title sec-preg">🤰 1. ${isTelugu ? 'సంతాన భాగ్యం & సుఖ ప్రసవ ప్రార్థనలు' : 'Pregnancy & Childbirth Intentions'} (${pregnancyPrayers.length})</div>
        <table>
          <thead>
            <tr>
              <th style="width: 40px; text-align: center;">${isTelugu ? 'క్ర.సం' : 'S.No'}</th>
              <th style="width: 140px;">${isTelugu ? 'భక్తుని పేరు' : 'Devotee'}</th>
              <th style="width: 110px;">${isTelugu ? 'గ్రామం' : 'Village'}</th>
              <th>${isTelugu ? 'ప్రార్థనా విన్నపం' : 'Intention'}</th>
              <th style="width: 90px; text-align: center;">${isTelugu ? 'తేది' : 'Date'}</th>
            </tr>
          </thead>
          <tbody>${generatePrintRows(pregnancyPrayers)}</tbody>
        </table>

        <div class="section-title sec-health">🩺 2. ${isTelugu ? 'ఆరోగ్యం & శారీరక స్వస్థత ప్రార్థనలు' : 'Health & Healing Intentions'} (${healthPrayers.length})</div>
        <table>
          <thead>
            <tr>
              <th style="width: 40px; text-align: center;">${isTelugu ? 'క్ర.సం' : 'S.No'}</th>
              <th style="width: 140px;">${isTelugu ? 'భక్తుని పేరు' : 'Devotee'}</th>
              <th style="width: 110px;">${isTelugu ? 'గ్రామం' : 'Village'}</th>
              <th>${isTelugu ? 'ప్రార్థనా విన్నపం' : 'Intention'}</th>
              <th style="width: 90px; text-align: center;">${isTelugu ? 'తేది' : 'Date'}</th>
            </tr>
          </thead>
          <tbody>${generatePrintRows(healthPrayers)}</tbody>
        </table>

        <div class="section-title sec-other">🕊️ 3. ${isTelugu ? 'కుటుంబ శాంతి & ఇతర ప్రత్యేక విన్నపాలు' : 'Family & Other Intentions'} (${otherPrayers.length})</div>
        <table>
          <thead>
            <tr>
              <th style="width: 40px; text-align: center;">${isTelugu ? 'క్ర.సం' : 'S.No'}</th>
              <th style="width: 140px;">${isTelugu ? 'భక్తుని పేరు' : 'Devotee'}</th>
              <th style="width: 110px;">${isTelugu ? 'గ్రామం' : 'Village'}</th>
              <th>${isTelugu ? 'ప్రార్థనా విన్నపం' : 'Intention'}</th>
              <th style="width: 90px; text-align: center;">${isTelugu ? 'తేది' : 'Date'}</th>
            </tr>
          </thead>
          <tbody>${generatePrintRows(otherPrayers)}</tbody>
        </table>

        <div class="footer">
          ${isTelugu ? 'వేమండ జపమాల మాత క్షేత్రం • వెంట్రప్రగడ విచారణ • దివ్యబలిపూజలో మరియు రథోత్సవంలో సమర్పణ' : 'Vemanda Japamala Matha Shrine • Ventrapragada Parish'}
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 400);
};

