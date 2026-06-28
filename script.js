// --- 1. CÁC HÀM BỔ TRỢ XỬ LÝ TOÁN HỌC ĐƯỢC NÂNG CẤP SỐ MŨ ---

// Hàm xáo trộn mảng hiện đại (Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Xây dựng chuỗi đa thức dạng tổng từ mảng các hạng tử
function buildSum(terms) {
    let processed = [...terms];
    shuffle(processed);
    let res = processed.join(" ").trim();
    if (res.startsWith("+ ")) {
        res = res.substring(2);
    }
    return res;
}

// 1. Hàm sinh ngẫu nhiên A và B: Thêm thuộc tính 'exp' (số mũ từ 1 đến 3)
function generateAB() {
    const coeffs = [2, 3, 4, 5];
    const vars = ['x', 'y', 'a', 'b', 'z', 't'];
    
    const c1 = coeffs[Math.floor(Math.random() * coeffs.length)];
    const c2 = coeffs[Math.floor(Math.random() * coeffs.length)];
    const v1 = vars[Math.floor(Math.random() * 3)];       // x, y, a
    const v2 = vars[Math.floor(Math.random() * 3) + 3];   // b, z, t
    
    // Sinh số mũ ngẫu nhiên từ 1 đến 3
    const e1 = Math.floor(Math.random() * 3) + 1;
    const e2 = Math.floor(Math.random() * 3) + 1;
    
    const style = Math.floor(Math.random() * 3);
    if (style === 0) {
        return { A: { coeff: c1, var: v1, exp: e1 }, B: { coeff: c2, var: v2, exp: e2 } };
    } else if (style === 1) {
        return { A: { coeff: c1, var: v1, exp: e1 }, B: { coeff: c2, var: '', exp: 0 } };
    } else {
        return { A: { coeff: c1, var: '', exp: 0 }, B: { coeff: c2, var: v2, exp: e2 } };
    }
}

// 2. Hiển thị số hạng cơ bản (Ví dụ: 2x^2 thay vì chỉ 2x)
function strTerm(t) {
    if (!t.var) return `${t.coeff}`;
    const vStr = t.exp === 1 ? t.var : `${t.var}<sup>${t.exp}</sup>`;
    if (t.coeff === 1) return vStr;
    return `${t.coeff}${vStr}`;
}

// 3. Tính lũy thừa số hạng (Tự động nhân dồn số mũ: (2x^2)^3 -> 8x^6)
function strPower(t, p) {
    const c = Math.pow(t.coeff, p);
    if (!t.var) return `${c}`; // Nếu là hằng số tự do
    
    const newExp = t.exp * p;
    const vStr = newExp === 1 ? t.var : `${t.var}<sup>${newExp}</sup>`;
    
    if (c === 1) return vStr;
    return `${c}${vStr}`;
}

// 4. Tính tích các hạng tử và gộp số mũ (Ví dụ: 3 * (2x^2)^2 * (3y^3)^1 -> 36.x^4.y^3)
function strProduct(factor, t1, p1, t2, p2) {
    const c1 = Math.pow(t1.coeff, p1);
    const c2 = t2 ? Math.pow(t2.coeff, p2) : 1;
    const totalCoeff = factor * c1 * c2;

    let v1 = '';
    if (t1.var) {
        const e1 = t1.exp * p1;
        v1 = e1 === 1 ? t1.var : `${t1.var}<sup>${e1}</sup>`;
    }

    let v2 = '';
    if (t2 && t2.var) {
        const e2 = t2.exp * p2;
        v2 = e2 === 1 ? t2.var : `${t2.var}<sup>${e2}</sup>`;
    }

    let varStr = '';
    if (v1 && v2) varStr = `${v1}.${v2}`;
    else varStr = v1 || v2;

    if (!varStr) return `${totalCoeff}`;
    if (totalCoeff === 1) return varStr;
    return `${totalCoeff}.${varStr}`; 
}


// --- 2. CẤU TRÚC 7 HẰNG ĐẲNG THỨC ĐÁNG NHỚ (Không cần sửa logic bên trong) ---

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

// --- 3. QUẢN LÝ TRẠNG THÁI UI & LOGIC TRÒ CHƠI ---

let correctQuestions = 0;
let totalQuestions = 0;

function initQuestion() {
    document.getElementById('next-btn').style.display = 'none';
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    const randomIdentityFn = identities[Math.floor(Math.random() * identities.length)];
    const { A, B } = generateAB(); // Object A và B giờ đây đã mang theo thuộc tính 'exp'

    const instance = randomIdentityFn(A, B);
    const direction = Math.floor(Math.random() * 2); 
    const data = (direction === 0) ? instance.forward() : instance.backward();

    document.getElementById('question').innerHTML = data.q + " = ?";

    let allOptions = [
        { text: data.a, isCorrect: true },
        ...data.w.map(wText => ({ text: wText, isCorrect: false }))
    ];
    shuffle(allOptions);

    allOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.innerHTML = opt.text;
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
        buttons.forEach(btn => {
            if (btn.dataset.isCorrect === "true") {
                btn.classList.add('correct');
            }
        });
    }

    const percent = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;
    document.getElementById('stats').innerText = `Số câu đúng: ${correctQuestions}/${totalQuestions} (${percent}%)`;
    document.getElementById('next-btn').style.display = 'inline-block';
}

window.onload = () => {
    initQuestion();
    document.getElementById('next-btn').onclick = initQuestion;
};