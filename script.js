// 1. Hàm sinh ngẫu nhiên A và B dưới dạng Object { coeff: hệ số, var: biến }
function generateAB() {
    const coeffs = [2, 3, 4, 5];
    const vars = ['x', 'y', 'a', 'b', 'z', 't'];
    
    const c1 = coeffs[Math.floor(Math.random() * coeffs.length)];
    const c2 = coeffs[Math.floor(Math.random() * coeffs.length)];
    const v1 = vars[Math.floor(Math.random() * 3)];       // x, y, a
    const v2 = vars[Math.floor(Math.random() * 3) + 3];   // b, z, t
    
    // Trộn cấu trúc ngẫu nhiên: (Số+Biến và Số+Biến) hoặc (Số+Biến và Hằng số)
    const style = Math.floor(Math.random() * 3);
    if (style === 0) {
        return { A: { coeff: c1, var: v1 }, B: { coeff: c2, var: v2 } };
    } else if (style === 1) {
        return { A: { coeff: c1, var: v1 }, B: { coeff: c2, var: '' } };
    } else {
        return { A: { coeff: c1, var: '' }, B: { coeff: c2, var: v2 } };
    }
}

// 2. Hiển thị số hạng cơ bản (Ví dụ: 2x, 3y, hoặc 5)
function strTerm(t) {
    if (!t.var) return `${t.coeff}`;
    if (t.coeff === 1) return t.var;
    return `${t.coeff}${t.var}`;
}

// 3. Tính lũy thừa số hạng (Ví dụ: (2x)^2 -> 4x^2)
function strPower(t, p) {
    const c = Math.pow(t.coeff, p);
    if (!t.var) return `${c}`;
    const v = `${t.var}<sup>${p}</sup>`;
    if (c === 1) return v;
    return `${c}${v}`;
}

// 4. Tính tích các hạng tử và tự động thêm dấu "." rút gọn (Ví dụ: 2 * 2x * 3y -> 12.x.y)
function strProduct(factor, t1, p1, t2, p2) {
    const c1 = Math.pow(t1.coeff, p1);
    const c2 = t2 ? Math.pow(t2.coeff, p2) : 1;
    const totalCoeff = factor * c1 * c2;

    let v1 = t1.var ? (p1 === 1 ? t1.var : `${t1.var}<sup>${p1}</sup>`) : '';
    let v2 = (t2 && t2.var) ? (p2 === 1 ? t2.var : `${t2.var}<sup>${p2}</sup>`) : '';

    let varStr = '';
    if (v1 && v2) varStr = `${v1}.${v2}`;
    else varStr = v1 || v2;

    if (!varStr) return `${totalCoeff}`;
    if (totalCoeff === 1) return varStr;
    return `${totalCoeff}.${varStr}`; // Định dạng chuẩn hóa: Hệ số.Biến1.Biến2
}

// Hàm xáo trộn mảng hiện đại (Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Thay thế các ký tự đại diện {A} và {B}
function replaceAll(str, A, B) {
    return str.replace(/\{A\}/g, A).replace(/\{B\}/g, B);
}

// Xây dựng chuỗi đa thức dạng tổng từ mảng các hạng tử có kèm dấu sẵn
function buildSum(terms, A, B) {
    let processed = terms.map(t => replaceAll(t, A, B));
    shuffle(processed);
    let res = processed.join(" ").trim();
    // Nếu hạng tử nhảy lên đầu tiên mang dấu cộng, ta sẽ bỏ dấu đi cho đẹp
    if (res.startsWith("+ ")) {
        res = res.substring(2);
    }
    return res;
}

// Xây dựng chuỗi dạng tích (nối với nhau bằng dấu chấm)
function buildProduct(blocks, A, B) {
    let processed = blocks.map(b => replaceAll(b, A, B));
    shuffle(processed);
    return processed.join(".");
}

// Định nghĩa 7 hằng đẳng thức đáng nhớ 
const identities = [
    // 1. Bình phương của một tổng
    (A, B) => {
        const lhs = `(${strTerm(A)} + ${strTerm(B)})<sup>2</sup>`;
        const getRhs = () => buildSum(['+ ' + strPower(A, 2), '+ ' + strProduct(2, A, 1, B, 1), '+ ' + strPower(B, 2)]);
        const getWrongRhs = () => [
            buildSum(['+ ' + strPower(A, 2), '- ' + strProduct(2, A, 1, B, 1), '+ ' + strPower(B, 2)]),
            buildSum(['+ ' + strPower(A, 2), '+ ' + strProduct(1, A, 1, B, 1), '+ ' + strPower(B, 2)]),
            `(${strTerm(A)} + ${strTerm(B)})<sup>3</sup>`
        ];
        return {
            forward: () => ({ q: lhs, a: getRhs(), w: getWrongRhs() }),
            backward: () => ({ q: getRhs(), a: lhs, w: [`(${strTerm(A)} - ${strTerm(B)})<sup>2</sup>`, buildSum(['+ ' + strPower(A, 2), '- ' + strPower(B, 2)]), `(${strTerm(A)} + ${strTerm(B)})<sup>3</sup>`] })
        };
    },
    // 2. Bình phương của một hiệu
    (A, B) => {
        const lhs = `(${strTerm(A)} - ${strTerm(B)})<sup>2</sup>`;
        const getRhs = () => buildSum(['+ ' + strPower(A, 2), '- ' + strProduct(2, A, 1, B, 1), '+ ' + strPower(B, 2)]);
        const getWrongRhs = () => [
            buildSum(['+ ' + strPower(A, 2), '+ ' + strProduct(2, A, 1, B, 1), '+ ' + strPower(B, 2)]),
            buildSum(['+ ' + strPower(A, 2), '- ' + strProduct(1, A, 1, B, 1), '+ ' + strPower(B, 2)]),
            buildSum(['- ' + strPower(A, 2), '- ' + strProduct(2, A, 1, B, 1), '+ ' + strPower(B, 2)])
        ];
        return {
            forward: () => ({ q: lhs, a: getRhs(), w: getWrongRhs() }),
            backward: () => ({ q: getRhs(), a: lhs, w: [`(${strTerm(A)} + ${strTerm(B)})<sup>2</sup>`, buildSum(['+ ' + strPower(A, 2), '- ' + strPower(B, 2)]), `(${strTerm(A)} - ${strTerm(B)})<sup>3</sup>`] })
        };
    },
    // 3. Hiệu hai bình phương
    (A, B) => {
        const lhs = buildSum(['+ ' + strPower(A, 2), '- ' + strPower(B, 2)]);
        const getRhs = () => `(${strTerm(A)} - ${strTerm(B)}).(${strTerm(A)} + ${strTerm(B)})`;
        const getWrongRhs = () => [
            `(${strTerm(A)} - ${strTerm(B)}).(${strTerm(A)} - ${strTerm(B)})`,
            `(${strTerm(A)} + ${strTerm(B)}).(${strTerm(A)} + ${strTerm(B)})`,
            `(${strTerm(A)} - ${strTerm(B)})<sup>2</sup>`
        ];
        return {
            forward: () => ({ q: lhs, a: getRhs(), w: getWrongRhs() }),
            backward: () => ({ q: getRhs(), a: lhs, w: [buildSum(['+ ' + strPower(A, 2), '+ ' + strPower(B, 2)]), buildSum(['- ' + strPower(A, 2), '- ' + strPower(B, 2)]), `(${strTerm(A)} + ${strTerm(B)})<sup>2</sup>`] })
        };
    },
    // 4. Lập phương của một tổng
    (A, B) => {
        const lhs = `(${strTerm(A)} + ${strTerm(B)})<sup>3</sup>`;
        const getRhs = () => buildSum(['+ ' + strPower(A, 3), '+ ' + strProduct(3, A, 2, B, 1), '+ ' + strProduct(3, A, 1, B, 2), '+ ' + strPower(B, 3)]);
        const getWrongRhs = () => [
            buildSum(['+ ' + strPower(A, 3), '- ' + strProduct(3, A, 2, B, 1), '+ ' + strProduct(3, A, 1, B, 2), '- ' + strPower(B, 3)]),
            buildSum(['+ ' + strPower(A, 3), '+ ' + strProduct(1, A, 2, B, 1), '+ ' + strProduct(1, A, 1, B, 2), '+ ' + strPower(B, 3)]),
            `(${strTerm(A)} + ${strTerm(B)})<sup>2</sup>`
        ];
        return {
            forward: () => ({ q: lhs, a: getRhs(), w: getWrongRhs() }),
            backward: () => ({ q: getRhs(), a: lhs, w: [`(${strTerm(A)} - ${strTerm(B)})<sup>3</sup>`, buildSum(['+ ' + strPower(A, 3), '+ ' + strPower(B, 3)]), `(${strTerm(A)} + ${strTerm(B)})<sup>2</sup>`] })
        };
    },
    // 5. Lập phương của một hiệu
    (A, B) => {
        const lhs = `(${strTerm(A)} - ${strTerm(B)})<sup>3</sup>`;
        const getRhs = () => buildSum(['+ ' + strPower(A, 3), '- ' + strProduct(3, A, 2, B, 1), '+ ' + strProduct(3, A, 1, B, 2), '- ' + strPower(B, 3)]);
        const getWrongRhs = () => [
            buildSum(['+ ' + strPower(A, 3), '+ ' + strProduct(3, A, 2, B, 1), '+ ' + strProduct(3, A, 1, B, 2), '+ ' + strPower(B, 3)]),
            buildSum(['+ ' + strPower(A, 3), '- ' + strProduct(1, A, 2, B, 1), '+ ' + strProduct(1, A, 1, B, 2), '- ' + strPower(B, 3)]),
            `(${strTerm(A)} - ${strTerm(B)})<sup>2</sup>`
        ];
        return {
            forward: () => ({ q: lhs, a: getRhs(), w: getWrongRhs() }),
            backward: () => ({ q: getRhs(), a: lhs, w: [`(${strTerm(A)} + ${strTerm(B)})<sup>3</sup>`, buildSum(['+ ' + strPower(A, 3), '- ' + strPower(B, 3)]), `(${strTerm(A)} - ${strTerm(B)})<sup>2</sup>`] })
        };
    },
    // 6. Tổng hai lập phương
    (A, B) => {
        const lhs = buildSum(['+ ' + strPower(A, 3), '+ ' + strPower(B, 3)]);
        const getRhs = () => `(${strTerm(A)} + ${strTerm(B)}).(${buildSum(['+ ' + strPower(A, 2), '- ' + strProduct(1, A, 1, B, 1), '+ ' + strPower(B, 2)])})`;
        const getWrongRhs = () => [
            `(${strTerm(A)} - ${strTerm(B)}).(${buildSum(['+ ' + strPower(A, 2), '+ ' + strProduct(1, A, 1, B, 1), '+ ' + strPower(B, 2)])})`,
            `(${strTerm(A)} + ${strTerm(B)}).(${buildSum(['+ ' + strPower(A, 2), '+ ' + strProduct(1, A, 1, B, 1), '+ ' + strPower(B, 2)])})`,
            `(${strTerm(A)} + ${strTerm(B)})<sup>3</sup>`
        ];
        return {
            forward: () => ({ q: lhs, a: getRhs(), w: getWrongRhs() }),
            backward: () => ({ q: getRhs(), a: lhs, w: [buildSum(['+ ' + strPower(A, 3), '- ' + strPower(B, 3)]), `(${strTerm(A)} + ${strTerm(B)})<sup>3</sup>`, `(${strTerm(A)} + ${strTerm(B)})<sup>2</sup>`] })
        };
    },
    // 7. Hiệu hai lập phương
    (A, B) => {
        const lhs = buildSum(['+ ' + strPower(A, 3), '- ' + strPower(B, 3)]);
        const getRhs = () => `(${strTerm(A)} - ${strTerm(B)}).(${buildSum(['+ ' + strPower(A, 2), '+ ' + strProduct(1, A, 1, B, 1), '+ ' + strPower(B, 2)])})`;
        const getWrongRhs = () => [
            `(${strTerm(A)} + ${strTerm(B)}).(${buildSum(['+ ' + strPower(A, 2), '- ' + strProduct(1, A, 1, B, 1), '+ ' + strPower(B, 2)])})`,
            `(${strTerm(A)} - ${strTerm(B)}).(${buildSum(['+ ' + strPower(A, 2), '- ' + strProduct(1, A, 1, B, 1), '+ ' + strPower(B, 2)])})`,
            `(${strTerm(A)} - ${strTerm(B)})<sup>3</sup>`
        ];
        return {
            forward: () => ({ q: lhs, a: getRhs(), w: getWrongRhs() }),
            backward: () => ({ q: getRhs(), a: lhs, w: [buildSum(['+ ' + strPower(A, 3), '+ ' + strPower(B, 3)]), `(${strTerm(A)} - ${strTerm(B)})<sup>3</sup>`, `(${strTerm(A)} - ${strTerm(B)})<sup>2</sup>`] })
        };
    }
];

let correctQuestions = 0;
let totalQuestions = 0;

function initQuestion() {
    document.getElementById('next-btn').style.display = 'none';
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    // 1. Lấy ngẫu nhiên hằng đẳng thức từ danh sách
    const randomIdentityFn = identities[Math.floor(Math.random() * identities.length)];
    
    // 2. THAY ĐỔI TẠI ĐÂY: Sử dụng hàm sinh Object {coeff, var} thay vì ký tự thô
    const { A, B } = generateAB();

    // 3. Sinh ngẫu nhiên chiều thuận hoặc nghịch
    const instance = randomIdentityFn(A, B);
    const direction = Math.floor(Math.random() * 2); 
    const data = (direction === 0) ? instance.forward() : instance.backward();

    document.getElementById('question').innerHTML = data.q + " = ?";

    // 4. Trộn đáp án đúng và các đáp án nhiễu (Giữ nguyên)
    let allOptions = [
        { text: data.a, isCorrect: true },
        ...data.w.map(wText => ({ text: wText, isCorrect: false }))
    ];
    shuffle(allOptions);

    // 5. Hiển thị các phương án lựa chọn (Giữ nguyên)
    allOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.innerHTML = opt.text;
        // Sử dụng thuộc tính dataset để check câu trả lời chuẩn xác 100%
        btn.dataset.isCorrect = opt.isCorrect;
        btn.onclick = () => checkAnswer(btn, opt.isCorrect);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedBtn, isCorrect) {
    const buttons = document.querySelectorAll('.option');
    buttons.forEach(btn => btn.disabled = true);

    totalQuestions++;

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        correctQuestions++;
    } else {
        selectedBtn.classList.add('wrong');
        // Cho hiển thị đáp án đúng nếu chọn sai
        buttons.forEach(btn => {
            if (btn.dataset.isCorrect === "true") {
                btn.classList.add('correct');
            }
        });
    }

    // Cập nhật thống kê tỉ lệ
    const percent = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;
    document.getElementById('stats').innerText = `Số câu đúng: ${correctQuestions}/${totalQuestions} (${percent}%)`;

    // Hiển thị nút "Câu tiếp theo" để tiếp tục kể cả khi sai
    document.getElementById('next-btn').style.display = 'inline-block';
}

window.onload = () => {
    initQuestion();
    document.getElementById('next-btn').onclick = initQuestion;
};