import React from 'react';
import { Document, Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';
import { HeaderLogo } from '../Constant/ImageConstant'; // Update this import as per your file structure

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 35,
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    height: 50,
    textAlign: 'center',
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    height: 50,
    textAlign: 'center',
    marginTop: 20,
  },
  body: {
    marginTop: 70,
    marginBottom: 70,
    textAlign: 'center',
  },
  table: {
    display: "table",
    width: "auto",
    margin: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    margin: "auto",
    marginTop: 5,
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    backgroundColor: '#f3f3f3',
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    padding: 5,
    fontSize: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
});

const InspectionReportPdf = ({ reportData }) => (
  <Document>
    {/* First Page */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={HeaderLogo} />
      </View>
      <View style={styles.body}>
        <Text>Sample Pdf pages</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Proposal No</Text>
            <Text style={styles.tableCellHeader}>Breakin Case Id</Text>
            <Text style={styles.tableCellHeader}>Proposal Start Date</Text>
            <Text style={styles.tableCellHeader}>Proposal End Date</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>asasa</Text>
            <Text style={styles.tableCell}>{reportData?.breaking_case_id}</Text>
            <Text style={styles.tableCell}>{reportData?.proposal_detail?.proposal_start_date}</Text>
            <Text style={styles.tableCell}>{reportData?.proposal_detail?.proposal_end_date}</Text>
          </View>
          {/* Add more rows as needed */}
        </View>
      </View>
      <View style={styles.footer}>
        <Image src={HeaderLogo} />
      </View>
    </Page>

    {/* Additional Pages (if any) */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={HeaderLogo} />
      </View>
      <View style={styles.body}>
        <Text>Additional Sample Pdf pages</Text>
        {/* Add content for additional pages */}
      </View>
      <View style={styles.footer}>
        <Image src={HeaderLogo} />
      </View>
    </Page>
  </Document>
);

export default InspectionReportPdf;
