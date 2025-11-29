import PDFDocument from 'pdfkit';

// Color scheme matching frontend
const colors = {
  primary: '#ac6cf4',        // Purple
  primaryDark: '#6B3FA0',    // Darker purple
  primaryLight: '#D4B5FF',   // Light purple
  secondary: '#1F3A7A',      // Dark blue
  accent: '#3B82F6',         // Blue
  background: '#F8F9FA',     // Light gray
  border: '#E0E0E0',         // Gray border
  text: '#333333',           // Dark text
  textLight: '#666666',      // Light gray text
  success: '#27AE60',        // Green
  white: '#FFFFFF'           // White
};

// Helper function to draw a rounded rectangle
const drawRoundedRect = (doc, x, y, width, height, radius, fillColor, strokeColor) => {
  doc.roundedRect(x, y, width, height, radius);
  if (fillColor) doc.fillColor(fillColor).fill();
  if (strokeColor) doc.strokeColor(strokeColor).stroke();
};

const generateInvoice = async (paymentData) => {
  try {
    console.log('📄 Starting invoice generation with data:', {
      orderId: paymentData.orderId,
      userId: paymentData.user?._id,
      userName: paymentData.user?.name,
      courseId: paymentData.course?._id,
      courseTitle: paymentData.course?.title,
      amount: paymentData.amount,
      gpayTransactionId: paymentData.gpayTransactionId
    });

    // Validate required data
    if (!paymentData.orderId || !paymentData.user || !paymentData.course) {
      throw new Error('Missing required invoice data');
    }

  const {
    orderId,
    user,
    course,
    amount,
    gpayTransactionId,
    verifiedAt,
    paidAt
  } = paymentData;

  // Create a PDF document
  const doc = new PDFDocument({
    size: 'A4',
    margin: 0
  });

  // Create a buffer to store the PDF
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  // Return a promise that resolves with the PDF buffer
  return new Promise((resolve, reject) => {
    doc.on('end', () => {
      try {
        const pdfBuffer = Buffer.concat(buffers);
        console.log('📄 PDF generation completed, size:', pdfBuffer.length, 'bytes');
        resolve(pdfBuffer);
      } catch (error) {
        reject(error);
      }
    });

    // ===== HEADER SECTION WITH GRADIENT EFFECT =====
    // Gradient background header (purple to blue)
    doc.rect(0, 0, 612, 140)
       .fillColor(colors.primary)
       .fill();
    
    // Add gradient overlay effect
    doc.rect(0, 0, 612, 140)
       .fillColor(colors.secondary)
       .opacity(0.05)
       .fill();
    
    // Add company logo (rounded effect with margin)
    try {
      console.log('🖼️ Attempting to add company logo...');
      // Add circular background for logo (light purple)
      doc.circle(60, 70, 40)
         .fillColor(colors.white)
         .opacity(0.95)
         .fill();
      doc.image('public/images/Stemelix-email-logo.jpg', 20, 30, { width: 80 });
      console.log('✅ Logo added successfully');
    } catch (error) {
      console.error('❌ Error adding logo:', error);
    }

    // Add company name and tagline
    doc.fontSize(20)
       .fillColor(colors.white)
       .font('Helvetica-Bold')
       .text('STEMELIX', 115, 35);
    
    doc.fontSize(10)
       .fillColor(colors.primaryLight)
       .font('Helvetica')
       .text('Learning Through Innovation', 115, 60);

    // ===== INVOICE TITLE AND DETAILS =====
    const titleY = 160;
    doc.fontSize(28)
       .fillColor(colors.primary)
       .font('Helvetica-Bold')
       .text('INVOICE', 50);

    // Invoice meta details on right side
    const detailsX = 350;
    doc.fontSize(9)
       .fillColor(colors.textLight)
       .font('Helvetica')
       .text(`Invoice #: INV-${orderId}`, detailsX, titleY)
       .text(`Date: ${new Date(paidAt).toLocaleDateString()}`, detailsX, titleY + 18)
       .text(`Transaction ID: ${gpayTransactionId}`, detailsX, titleY + 36);

    // Divider line
    doc.moveTo(50, 210)
       .lineTo(562, 210)
       .strokeColor(colors.primary)
       .lineWidth(2)
       .stroke();

    // ===== STUDENT DETAILS SECTION =====
    const studentBoxY = 240;
    doc.fontSize(12)
       .fillColor(colors.primary)
       .font('Helvetica-Bold')
       .text('STUDENT DETAILS', 50, studentBoxY);
    
    doc.fontSize(10)
       .fillColor(colors.text)
       .font('Helvetica')
       .text(`Name:`, 50, studentBoxY + 28)
       .text(`${user.name}`, 130, studentBoxY + 28)
       .text(`Email:`, 50, studentBoxY + 50)
       .text(`${user.email}`, 130, studentBoxY + 50);

    // ===== COURSE DETAILS SECTION =====
    const courseBoxY = 345;
    doc.fontSize(12)
       .fillColor(colors.primary)
       .font('Helvetica-Bold')
       .text('COURSE DETAILS', 50, courseBoxY);
    
    doc.fontSize(10)
       .fillColor(colors.text)
       .font('Helvetica')
       .text(`Course Name:`, 50, courseBoxY + 28)
       .text(`${course.title}`, 130, courseBoxY + 28);

    // ===== PAYMENT SUMMARY BOX =====
    const summaryBoxY = 445;
    const boxWidth = 512;
    const boxHeight = 130;
    
    // Draw rounded rectangle for summary with primary color
    doc.roundedRect(50, summaryBoxY, boxWidth, boxHeight, 10)
       .fillColor(colors.primaryLight)
       .opacity(0.15)
       .fill()
       .strokeColor(colors.primary)
       .opacity(1)
       .lineWidth(2)
       .stroke();

    // Payment details inside box
    doc.fontSize(12)
       .fillColor(colors.primary)
       .font('Helvetica-Bold')
       .text('PAYMENT SUMMARY', 65, summaryBoxY + 15);

    doc.fontSize(10)
       .fillColor(colors.text)
       .font('Helvetica')
       .text(`Course Amount:`, 65, summaryBoxY + 42)
       .text(`Tax (0%):`, 65, summaryBoxY + 65)
       .text(`Discount:`, 65, summaryBoxY + 88);

    doc.fontSize(10)
       .fillColor(colors.text)
       .text(`₹${amount}`, 420, summaryBoxY + 42, { align: 'right' })
       .text(`₹0.00`, 420, summaryBoxY + 65, { align: 'right' })
       .text(`₹0.00`, 420, summaryBoxY + 88, { align: 'right' });

    // Total line
    doc.moveTo(65, summaryBoxY + 108)
       .lineTo(520, summaryBoxY + 108)
       .strokeColor(colors.primary)
       .lineWidth(1)
       .stroke();

    doc.fontSize(13)
       .fillColor(colors.primary)
       .font('Helvetica-Bold')
       .text(`Total Amount:`, 65, summaryBoxY + 115)
       .text(`₹${amount}`, 420, summaryBoxY + 115, { align: 'right' });

    // ===== PAYMENT STATUS SECTION =====
    const statusBoxY = 600;
    doc.fontSize(12)
       .fillColor(colors.primary)
       .font('Helvetica-Bold')
       .text('PAYMENT INFORMATION', 50, statusBoxY);

    doc.fontSize(10)
       .fillColor(colors.text)
       .font('Helvetica')
       .text(`Status:`, 50, statusBoxY + 28)
       .text(`Payment Method:`, 50, statusBoxY + 50)
       .text(`Payment Date:`, 50, statusBoxY + 72)
       .text(`Verification Date:`, 50, statusBoxY + 94);

    doc.fontSize(10)
       .fillColor(colors.success)
       .font('Helvetica-Bold')
       .text(`VERIFIED ✓`, 180, statusBoxY + 28);

    doc.fontSize(10)
       .fillColor(colors.text)
       .font('Helvetica')
       .text(`Google Pay / Card`, 180, statusBoxY + 50)
       .text(`${new Date(paidAt).toLocaleString()}`, 180, statusBoxY + 72)
       .text(`${new Date(verifiedAt).toLocaleString()}`, 180, statusBoxY + 94);

    // ===== FOOTER SECTION =====
    const footerY = 710;
    doc.moveTo(50, footerY - 35)
       .lineTo(562, footerY - 35)
       .strokeColor(colors.border)
       .lineWidth(1)
       .stroke();

    // Footer background
    doc.rect(0, footerY - 30, 612, 30)
       .fillColor(colors.background)
       .fill();

    doc.fontSize(8)
       .fillColor(colors.textLight)
       .font('Helvetica')
       .text('Thank you for your purchase! This is a computer-generated invoice and requires no signature.', 50, footerY - 22, {
         align: 'center'
       })
       .text('For support, contact: support@stemelix.com | Website: www.stemelix.com', 50, footerY - 8, {
         align: 'center'
       });

    // Finalize the PDF
    doc.end();
  });
  } catch (error) {
    console.error('❌ Error generating invoice:', error);
    throw error;
  }
};

export default generateInvoice;